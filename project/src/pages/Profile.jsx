import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEdit, FaSignOutAlt, FaHeart } from 'react-icons/fa'

const Profile = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  })
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  const toggleEdit = () => {
    setIsEditing(!isEditing)
    // Reset form data if canceling edit
    if (isEditing) {
      setUserData({
        name: currentUser?.name || '',
        email: currentUser?.email || ''
      })
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would update the user profile here
    // For this demo, we'll just toggle back to view mode
    setIsEditing(false)
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-600">
            Manage your account settings and view your favorites
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 animate-fade-in">
              <div className="flex items-center justify-center flex-col mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FaUser className="text-primary-600 text-4xl" />
                </div>
                <h2 className="text-xl font-semibold">{currentUser?.name || currentUser?.email}</h2>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
              
              <div className="space-y-2">
                <Link 
                  to="/favorites"
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors w-full"
                >
                  <FaHeart className="text-accent-500" />
                  <span>Your Favorites</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <FaSignOutAlt className="text-gray-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Account Information</h2>
                <button
                  onClick={toggleEdit}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
                >
                  {isEditing ? 'Cancel' : (
                    <>
                      <FaEdit />
                      Edit
                    </>
                  )}
                </button>
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={userData.name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                    <p className="text-gray-900">{currentUser?.name || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                    <p className="text-gray-900">{currentUser?.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Account Created</h3>
                    <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Favorite Countries</h3>
                    <p className="text-gray-900">
                      {currentUser?.favorites?.length || 0} countries saved
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-card p-6 mt-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6">Activity</h2>
              
              <div className="text-center py-8 text-gray-500">
                <p>Activity tracking will be available in a future update.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile