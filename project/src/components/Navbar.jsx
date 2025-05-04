import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { FaGlobeAmericas, FaUser, FaSignOutAlt, FaHeart } from 'react-icons/fa'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsOpen(false)
  }
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when changing route
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary-600 font-bold text-xl"
        >
          <FaGlobeAmericas className="text-2xl" />
          <span>World Explorer</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/countries" 
            className={`font-medium hover:text-primary-600 transition-colors ${
              location.pathname === '/countries' ? 'text-primary-600' : 'text-gray-700'
            }`}
          >
            Explore Countries
          </Link>
          
          {currentUser ? (
            <>
              <Link 
                to="/favorites" 
                className={`font-medium hover:text-primary-600 transition-colors ${
                  location.pathname === '/favorites' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Favorites
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                  <span>{currentUser.name || currentUser.email}</span>
                  <FaUser />
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden flex items-center"
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-2">
            <div className={`w-8 h-0.5 bg-gray-600 transition-all ${isOpen ? 'transform rotate-45 translate-y-2.5' : ''}`}></div>
            <div className={`w-8 h-0.5 bg-gray-600 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-8 h-0.5 bg-gray-600 transition-all ${isOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`}></div>
          </div>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white w-full transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen shadow-md' : 'max-h-0'
      }`}>
        <div className="container-custom py-4 flex flex-col gap-4">
          <Link 
            to="/countries" 
            className="py-2 px-4 hover:bg-gray-50 rounded"
          >
            Explore Countries
          </Link>
          
          {currentUser ? (
            <>
              <Link 
                to="/favorites" 
                className="py-2 px-4 hover:bg-gray-50 rounded flex items-center gap-2"
              >
                <FaHeart className="text-accent-500" />
                Favorites
              </Link>
              <Link 
                to="/profile" 
                className="py-2 px-4 hover:bg-gray-50 rounded flex items-center gap-2"
              >
                <FaUser />
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="py-2 px-4 hover:bg-gray-50 rounded text-left flex items-center gap-2 w-full"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link 
                to="/login" 
                className="py-2 px-4 hover:bg-gray-50 rounded"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar