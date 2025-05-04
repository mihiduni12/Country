import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v2'

// Get all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`)
    return response.data
  } catch (error) {
    console.error('Error fetching all countries:', error)
    throw error
  }
}

// Search countries by name
export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [] // Return empty array when no countries found
    }
    console.error('Error searching countries by name:', error)
    throw error
  }
}

// Get countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`)
    return response.data
  } catch (error) {
    console.error('Error fetching countries by region:', error)
    throw error
  }
}

// Get a single country by alpha code (e.g., USA, GBR)
export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`)
    return response.data
  } catch (error) {
    console.error('Error fetching country by code:', error)
    throw error
  }
}

// Get all languages (extracted from countries data)
export const getAllLanguages = async () => {
  try {
    const countries = await getAllCountries()
    // Extract all languages
    const languagesMap = new Map()
    
    countries.forEach(country => {
      if (country.languages) {
        country.languages.forEach(lang => {
          languagesMap.set(lang.iso639_1, {
            code: lang.iso639_1,
            name: lang.name
          })
        })
      }
    })
    
    return Array.from(languagesMap.values())
  } catch (error) {
    console.error('Error getting languages:', error)
    throw error
  }
}

// Get countries that speak a specific language
export const getCountriesByLanguage = async (languageCode) => {
  try {
    // Get all countries first
    const countries = await getAllCountries()
    
    // Filter countries that have the specified language
    return countries.filter(country => 
      country.languages && 
      country.languages.some(lang => lang.iso639_1 === languageCode)
    )
  } catch (error) {
    console.error('Error fetching countries by language:', error)
    throw error
  }
}