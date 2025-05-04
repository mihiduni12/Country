import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CountryCard from '../components/CountryCard'
import { AuthProvider } from '../contexts/AuthContext'

// Mock country data
const mockCountry = {
  alpha3Code: 'USA',
  name: 'United States',
  capital: 'Washington D.C.',
  region: 'Americas',
  population: 331002651,
  flags: {
    png: 'https://example.com/flag.png'
  }
}

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    currentUser: null,
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    isInFavorites: jest.fn(() => false)
  })
}))

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('CountryCard Component', () => {
  test('renders country information correctly', () => {
    renderWithRouter(<CountryCard country={mockCountry} />)
    
    // Check country name is displayed
    expect(screen.getByText('United States')).toBeInTheDocument()
    
    // Check other country details
    expect(screen.getByText(/Washington D.C./)).toBeInTheDocument()
    expect(screen.getByText(/Americas/)).toBeInTheDocument()
    expect(screen.getByText(/331,002,651/)).toBeInTheDocument()
    
    // Check flag image
    const flagImg = screen.getByAltText('Flag of United States')
    expect(flagImg).toBeInTheDocument()
    expect(flagImg.src).toBe('https://example.com/flag.png')
  })
  
  test('links to the country detail page', () => {
    renderWithRouter(<CountryCard country={mockCountry} />)
    
    const cardLink = screen.getByRole('link')
    expect(cardLink).toHaveAttribute('href', '/countries/USA')
  })
})