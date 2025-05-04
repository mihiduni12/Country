import { useState, useEffect, useRef } from 'react'
import { FaChevronDown, FaCheck } from 'react-icons/fa'

const FilterDropdown = ({ options, placeholder, onSelect, selectedValue, type }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  
  const handleSelect = (value) => {
    onSelect(value)
    setIsOpen(false)
  }
  
  // Get display name from the selected value
  const getDisplayName = () => {
    if (!selectedValue) return placeholder
    
    const selected = options.find(option => 
      option.value === selectedValue || option.code === selectedValue
    )
    
    return selected ? selected.label || selected.name : placeholder
  }
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="input-field flex items-center justify-between w-full md:w-auto min-w-[200px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{getDisplayName()}</span>
        <FaChevronDown 
          className={`ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1" role="listbox">
            {/* Clear option */}
            <li
              role="option"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSelect('')}
            >
              <span className="flex-grow">All {type}s</span>
              {!selectedValue && <FaCheck className="text-primary-600" />}
            </li>
            
            {/* Options */}
            {options.map((option) => {
              const value = option.value || option.code
              const label = option.label || option.name
              
              return (
                <li
                  key={value}
                  role="option"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSelect(value)}
                >
                  <span className="flex-grow">{label}</span>
                  {selectedValue === value && <FaCheck className="text-primary-600" />}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown