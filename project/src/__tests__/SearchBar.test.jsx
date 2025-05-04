import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar'

describe('SearchBar Component', () => {
  test('renders search input correctly', () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search countries...')
    expect(searchInput).toBeInTheDocument()
  })
  
  test('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    // Get the input and form
    const searchInput = screen.getByPlaceholderText('Search countries...')
    const form = searchInput.closest('form')
    
    // Type in the search query
    fireEvent.change(searchInput, { target: { value: 'canada' } })
    
    // Submit the form
    fireEvent.submit(form)
    
    // Check if onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('canada')
  })
  
  test('calls onSearch with empty string when clear button is clicked', () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    // Get the input
    const searchInput = screen.getByPlaceholderText('Search countries...')
    
    // Type in the search query
    fireEvent.change(searchInput, { target: { value: 'canada' } })
    
    // Get and click the clear button
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    fireEvent.click(clearButton)
    
    // Check if onSearch was called with empty string
    expect(mockOnSearch).toHaveBeenCalledWith('')
    
    // Check if input is cleared
    expect(searchInput.value).toBe('')
  })
})