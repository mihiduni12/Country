import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext.jsx'

const CountryCard = ({ country }) => {
  const { currentUser, addToFavorites, removeFromFavorites, isInFavorites } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(() => {
    return currentUser && isInFavorites(country.alpha3Code)
  })
  
  const handleImageLoad = () => {
    setIsLoading(false)
  }
  
  const toggleFavorite = (e) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Prevent event bubbling
    
    if (!currentUser) return
    
    if (isFavorite) {
      removeFromFavorites(country.alpha3Code)
    } else {
      addToFavorites(country)
    }
    
    setIsFavorite(!isFavorite)
  }
  
  // Format population with commas
  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Link 
      to={`/countries/${country.alpha3Code}`} 
      className="card group hover:translate-y-[-4px] animate-fade-in"
    >
      <div className="relative overflow-hidden rounded-lg h-40 mb-4">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
        />
        
        {currentUser && (
          <button 
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-accent-500 transition-colors z-10"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? 
              <FaHeart className="text-accent-500" /> : 
              <FaRegHeart />
            }
          </button>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
        {country.name}
      </h3>
      
      <div className="space-y-1 text-gray-600">
        <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {formatPopulation(country.population)}</p>
      </div>
    </Link>
  )
}

export default CountryCard