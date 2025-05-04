import { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [isActive, setIsActive] = useState(false)
  const searchRef = useRef(null)
  const inputRef = useRef(null)
  
  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(query)
  }
  
  const handleClear = () => {
    setQuery('')
    onSearch('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsActive(false)
    }
  }
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div 
      ref={searchRef}
      className={`relative rounded-full border transition-all duration-300 ${
        isActive 
          ? 'border-primary-500 shadow-md bg-white w-full md:w-96' 
          : 'border-gray-300 w-full md:w-80'
      }`}
    >
      <form onSubmit={handleSearch} className="flex items-center">
        <button
          type="submit"
          className="p-3 text-gray-500 hover:text-primary-600 transition-colors"
          aria-label="Search countries"
        >
          <FaSearch />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search countries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          className="py-2 px-2 w-full bg-transparent outline-none text-gray-800"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </form>
    </div>
  )
}

export default SearchBar