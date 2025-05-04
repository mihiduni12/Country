import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCountries } from '../api/countriesApi.js'
import CountryCard from '../components/CountryCard.jsx'
import { FaGlobeAmericas, FaSearch, FaStar, FaUserFriends } from 'react-icons/fa'

const Home = () => {
  const [featuredCountries, setFeaturedCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchFeaturedCountries = async () => {
      try {
        const countries = await getAllCountries()
        // Get 8 random countries for the featured section
        const shuffled = countries.sort(() => 0.5 - Math.random())
        setFeaturedCountries(shuffled.slice(0, 8))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching featured countries:', error)
        setIsLoading(false)
      }
    }
    
    fetchFeaturedCountries()
  }, [])
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Explore the World's Countries
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-fade-in">
              Discover information about countries, cultures, and peoples from around the globe
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/countries" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Explore All Countries
              </Link>
              <Link to="/register" className="btn bg-primary-500 text-white hover:bg-primary-400 border border-primary-400">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            preserveAspectRatio="none"
            width="100%"
            height="50"
            viewBox="0 0 1440 74"
            className="fill-white"
          >
            <path d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use World Explorer?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg animate-fade-in">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGlobeAmericas className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Explore the World</h3>
              <p className="text-gray-600">
                Access comprehensive information about countries from all regions of the world in one place.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Search &amp; Filter</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with powerful search and filtering options.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Favorites</h3>
              <p className="text-gray-600">
                Create an account to save your favorite countries and access them anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured Countries</h2>
            <Link to="/countries" className="btn btn-primary">
              View All Countries
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredCountries.map((country) => (
                <CountryCard key={country.alpha3Code} country={country} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore the World?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-100">
            Create a free account to save your favorite countries and customize your experience.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-primary-50">
              Sign Up for Free
            </Link>
            <Link to="/countries" className="btn bg-primary-500 text-white hover:bg-primary-400 border border-primary-400">
              Browse Countries
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home