import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCountryByCode } from '../api/countriesApi.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { FaArrowLeft, FaHeart, FaRegHeart, FaGlobe, FaUsers, FaMapMarkerAlt, FaMoneyBillWave, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa'

const CountryDetail = () => {
  const { countryCode } = useParams()
  const navigate = useNavigate()
  const { currentUser, addToFavorites, removeFromFavorites, isInFavorites } = useAuth()
  
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [flagLoaded, setFlagLoaded] = useState(false)
  const [borderCountries, setBorderCountries] = useState([])
  
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setIsLoading(true)
        setFlagLoaded(false)
        
        const countryData = await getCountryByCode(countryCode)
        setCountry(countryData)
        
        // Check if the country is in favorites
        if (currentUser) {
          setIsFavorite(isInFavorites(countryCode))
        }
        
        // Fetch border countries if any
        if (countryData.borders && countryData.borders.length > 0) {
          const borderPromises = countryData.borders.map(code => getCountryByCode(code))
          const borderData = await Promise.all(borderPromises)
          setBorderCountries(borderData)
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching country details:', error)
        setIsLoading(false)
      }
    }
    
    fetchCountryDetails()
  }, [countryCode, currentUser, isInFavorites])
  
  const handleImageLoad = () => {
    setFlagLoaded(true)
  }
  
  const toggleFavorite = () => {
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
  
  // Format languages as comma-separated list
  const formatLanguages = (languages) => {
    if (!languages) return 'N/A'
    return languages.map(lang => lang.name).join(', ')
  }
  
  // Format currencies as comma-separated list
  const formatCurrencies = (currencies) => {
    if (!currencies) return 'N/A'
    return currencies.map(currency => `${currency.name} (${currency.symbol || 'No symbol'})`).join(', ')
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (!country) {
    return (
      <div className="min-h-screen pt-20 container-custom">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Country Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find information for the requested country.
          </p>
          <Link to="/countries" className="btn btn-primary">
            Back to Countries
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2 btn btn-outline"
        >
          <FaArrowLeft /> Back
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Flag section */}
          <div className="relative overflow-hidden rounded-lg shadow-lg h-64 md:h-96 w-full animate-fade-in">
            {!flagLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            )}
            <img 
              src={country.flags?.svg || country.flags?.png} 
              alt={`Flag of ${country.name}`}
              className={`w-full h-full object-cover transition-opacity duration-500 ${flagLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
            />
            
            {currentUser && (
              <button 
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md flex items-center gap-2 font-medium transition-all hover:shadow-lg"
              >
                {isFavorite ? (
                  <>
                    <FaHeart className="text-accent-500" />
                    <span className="text-gray-800">Saved</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className="text-gray-600" />
                    <span className="text-gray-800">Save</span>
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* Country information */}
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{country.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 mb-8">
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaMapMarkerAlt className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Capital:</span>{' '}
                      <span>{country.capital || 'N/A'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaGlobe className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Region:</span>{' '}
                      <span>{country.region || 'N/A'}</span>
                      {country.subregion && ` (${country.subregion})`}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaUsers className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Population:</span>{' '}
                      <span>{formatPopulation(country.population)}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaGlobe className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Languages:</span>{' '}
                      <span>{formatLanguages(country.languages)}</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Additional Details</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaMoneyBillWave className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Currencies:</span>{' '}
                      <span>{formatCurrencies(country.currencies)}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaPhoneAlt className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Calling Code:</span>{' '}
                      <span>
                        {country.callingCodes?.length ? 
                          `+${country.callingCodes[0]}` : 
                          'N/A'
                        }
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCalendarAlt className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Timezones:</span>{' '}
                      <span>
                        {country.timezones?.length ? 
                          country.timezones.join(', ') : 
                          'N/A'
                        }
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaGlobe className="mt-1 text-primary-500" />
                    <div>
                      <span className="font-medium text-gray-700">Top Level Domain:</span>{' '}
                      <span>
                        {country.topLevelDomain?.length ? 
                          country.topLevelDomain.join(', ') : 
                          'N/A'
                        }
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Border countries */}
        {borderCountries.length > 0 && (
          <div className="bg-white rounded-lg shadow-card p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Border Countries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {borderCountries.map(border => (
                <Link 
                  key={border.alpha3Code} 
                  to={`/countries/${border.alpha3Code}`}
                  className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-center"
                >
                  <img 
                    src={border.flags.png} 
                    alt={`Flag of ${border.name}`}
                    className="w-16 h-10 object-cover rounded shadow-sm mb-2"
                  />
                  <span className="text-sm font-medium">{border.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CountryDetail