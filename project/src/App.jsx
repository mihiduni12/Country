import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CountriesList from './pages/CountriesList.jsx'
import CountryDetail from './pages/CountryDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import FavoriteCountries from './pages/FavoriteCountries.jsx'
import Profile from './pages/Profile.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  useEffect(() => {
    document.title = 'World Explorer - Discover Countries'
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<CountriesList />} />
          <Route path="/countries/:countryCode" element={<CountryDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <FavoriteCountries />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App