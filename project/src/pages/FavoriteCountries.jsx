import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import CountryCard from '../components/CountryCard.jsx'
import { FaHeart } from 'react-icons/fa'

const FavoriteCountries = () => {
  const { currentUser } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Get favorites from current user
    if (currentUser && currentUser.favorites) {
      setFavorites(currentUser.favorites)
    }
    setIsLoading(false)
  }, [currentUser])
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FaHeart className="text-accent-500" />
            Favorite Countries
          </h1>
          <p className="text-gray-600">
            Your saved countries from around the world
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-card animate-fade-in">
            <div className="mb-4">
              <FaHeart className="text-gray-300 text-6xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't saved any countries to your favorites yet. Explore countries and click the heart icon to add them here.
            </p>
            <Link 
              to="/countries" 
              className="btn btn-primary"
            >
              Explore Countries
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoriteCountries