import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Register a new user
  const register = (userData) => {
    return new Promise((resolve, reject) => {
      try {
        // In a real app, you would make an API call here
        // For this demo, we'll store the user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        
        // Check if email is already in use
        if (users.some(user => user.email === userData.email)) {
          reject(new Error('Email already in use'))
          return
        }
        
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          favorites: []
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        // Log in the user after successful registration
        setCurrentUser(newUser)
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        
        resolve(newUser)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Log in a user
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        // In a real app, you would make an API call here
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.email === email && u.password === password)
        
        if (user) {
          setCurrentUser(user)
          localStorage.setItem('currentUser', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid credentials'))
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  // Log out the current user
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  // Add a country to favorites
  const addToFavorites = (country) => {
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    
    if (userIndex !== -1) {
      // Check if country is already in favorites
      if (!users[userIndex].favorites.some(fav => fav.alpha3Code === country.alpha3Code)) {
        users[userIndex].favorites.push(country)
        localStorage.setItem('users', JSON.stringify(users))
        
        // Update current user
        const updatedUser = {...currentUser, favorites: users[userIndex].favorites}
        setCurrentUser(updatedUser)
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      }
    }
  }

  // Remove a country from favorites
  const removeFromFavorites = (countryCode) => {
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    
    if (userIndex !== -1) {
      users[userIndex].favorites = users[userIndex].favorites.filter(
        fav => fav.alpha3Code !== countryCode
      )
      localStorage.setItem('users', JSON.stringify(users))
      
      // Update current user
      const updatedUser = {...currentUser, favorites: users[userIndex].favorites}
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    }
  }

  // Check if a country is in favorites
  const isInFavorites = (countryCode) => {
    if (!currentUser) return false
    return currentUser.favorites.some(fav => fav.alpha3Code === countryCode)
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}