import { useState, useEffect } from 'react'
import { 
  getAllCountries, 
  searchCountriesByName, 
  getCountriesByRegion,
  getAllLanguages,
  getCountriesByLanguage
} from '../api/countriesApi.js'
import CountryCard from '../components/CountryCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterDropdown from '../components/FilterDropdown.jsx'
import { FaFilter, FaTimes } from 'react-icons/fa'

const CountriesList = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [regions, setRegions] = useState([])
  const [languages, setLanguages] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState('nameAsc') // default sort by name ascending
  
  // Sort options
  const sortOptions = [
    { value: 'nameAsc', label: 'Name (A-Z)' },
    { value: 'nameDesc', label: 'Name (Z-A)' },
    { value: 'populationAsc', label: 'Population (Low to High)' },
    { value: 'populationDesc', label: 'Population (High to Low)' }
  ]
  
  // Fetch all countries, regions, and languages on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const allCountries = await getAllCountries()
        setCountries(allCountries)
        setFilteredCountries(allCountries)
        
        // Extract unique regions
        const uniqueRegions = [...new Set(allCountries.map(country => country.region))]
          .filter(Boolean) // Remove empty values
          .sort()
          .map(region => ({ value: region, label: region }))
        setRegions(uniqueRegions)
        
        // Get all languages
        const languageList = await getAllLanguages()
        setLanguages(languageList)
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Apply filters when search query, region, language or sort order changes
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true)
      
      try {
        let results = []
        
        // Apply search filter
        if (searchQuery) {
          results = await searchCountriesByName(searchQuery)
        } else {
          results = [...countries]
        }
        
        // Apply region filter
        if (selectedRegion) {
          results = results.filter(country => country.region === selectedRegion)
        }
        
        // Apply language filter
        if (selectedLanguage) {
          const countriesWithLanguage = await getCountriesByLanguage(selectedLanguage)
          // Find intersection of current results and countries with selected language
          results = results.filter(country => 
            countriesWithLanguage.some(c => c.alpha3Code === country.alpha3Code)
          )
        }
        
        // Apply sorting
        results = sortCountries(results, sortOrder)
        
        setFilteredCountries(results)
      } catch (error) {
        console.error('Error applying filters:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    applyFilters()
  }, [searchQuery, selectedRegion, selectedLanguage, sortOrder, countries])
  
  // Sort countries based on sort order
  const sortCountries = (countries, order) => {
    const sorted = [...countries]
    
    switch (order) {
      case 'nameAsc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'nameDesc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'populationAsc':
        return sorted.sort((a, b) => a.population - b.population)
      case 'populationDesc':
        return sorted.sort((a, b) => b.population - a.population)
      default:
        return sorted
    }
  }
  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  // Handle region filter
  const handleRegionFilter = (region) => {
    setSelectedRegion(region)
  }
  
  // Handle language filter
  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language)
  }
  
  // Handle sort order change
  const handleSortChange = (order) => {
    setSortOrder(order)
  }
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedRegion('')
    setSelectedLanguage('')
    setSortOrder('nameAsc')
  }
  
  // Toggle mobile filter panel
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  
  // Check if any filter is active
  const isAnyFilterActive = searchQuery || selectedRegion || selectedLanguage || sortOrder !== 'nameAsc'
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Countries</h1>
          <p className="text-gray-600">
            Discover information about countries from around the world
          </p>
        </div>
        
        {/* Desktop filters */}
        <div className="hidden md:block mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex flex-wrap gap-4 ml-auto">
              <FilterDropdown 
                options={regions} 
                placeholder="All Regions" 
                onSelect={handleRegionFilter}
                selectedValue={selectedRegion}
                type="Region"
              />
              
              <FilterDropdown 
                options={languages} 
                placeholder="All Languages" 
                onSelect={handleLanguageFilter}
                selectedValue={selectedLanguage}
                type="Language"
              />
              
              <FilterDropdown 
                options={sortOptions} 
                placeholder="Sort by" 
                onSelect={handleSortChange}
                selectedValue={sortOrder}
                type="Sort"
              />
            </div>
          </div>
          
          {isAnyFilterActive && (
            <div className="flex items-center mt-4">
              <div className="text-sm text-gray-500">Filters applied</div>
              <button 
                onClick={clearAllFilters}
                className="ml-2 text-primary-600 hover:text-primary-800 text-sm flex items-center"
              >
                Clear all <FaTimes className="ml-1" />
              </button>
            </div>
          )}
        </div>
        
        {/* Mobile filters */}
        <div className="md:hidden mb-8">
          <div className="flex items-center gap-4 mb-4">
            <SearchBar onSearch={handleSearch} />
            
            <button 
              onClick={toggleFilterPanel}
              className="btn btn-outline flex items-center"
              aria-expanded={isFilterOpen}
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>
          
          {isFilterOpen && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filter & Sort</h3>
                <button 
                  onClick={toggleFilterPanel}
                  className="text-gray-500"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <FilterDropdown 
                    options={regions} 
                    placeholder="All Regions" 
                    onSelect={handleRegionFilter}
                    selectedValue={selectedRegion}
                    type="Region"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <FilterDropdown 
                    options={languages} 
                    placeholder="All Languages" 
                    onSelect={handleLanguageFilter}
                    selectedValue={selectedLanguage}
                    type="Language"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <FilterDropdown 
                    options={sortOptions} 
                    placeholder="Sort by" 
                    onSelect={handleSortChange}
                    selectedValue={sortOrder}
                    type="Sort"
                  />
                </div>
                
                {isAnyFilterActive && (
                  <button 
                    onClick={clearAllFilters}
                    className="w-full btn btn-outline text-primary-600 mt-4"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Results count */}
        <div className="mb-6 text-gray-600">
          Found {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
        </div>
        
        {/* Countries grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No countries found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={clearAllFilters}
              className="btn btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CountriesList