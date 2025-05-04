# World Explorer - Countries API Explorer

![World Explorer](https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

A comprehensive React application that allows users to explore information about countries from around the world using the REST Countries API.

## 🌐 Live Demo

[View the live application](#) - Link to be added once deployed

## ✨ Features

- **Country Exploration**: Browse, search and view detailed information about countries
- **Advanced Filtering**: Filter countries by region, language, and sort by various criteria
- **User Authentication**: Register, login, and maintain user sessions
- **Favorites System**: Save your favorite countries for quick access
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Elegant UI**: Modern and clean interface with smooth animations

## 🚀 Technologies Used

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS for responsive design
- **HTTP Client**: Axios for API requests
- **State Management**: React Context API for global state
- **Authentication**: Custom authentication with localStorage for persistence
- **Icons**: React Icons
- **Testing**: Jest and React Testing Library

## 🔧 API Integration

This application uses the [REST Countries API](https://restcountries.com/) to fetch data about countries. The following endpoints are utilized:

- `GET /all` - Retrieve all countries
- `GET /name/{name}` - Search for countries by name
- `GET /region/{region}` - Filter countries by region
- `GET /alpha/{code}` - Get detailed information about a specific country

## 📋 Setup and Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/world-explorer.git
   cd world-explorer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktop (> 1024px)

## 📝 Project Structure

```
src/
├── api/              # API integration
├── components/       # Reusable UI components
├── contexts/         # React Context providers
├── pages/            # Application pages
├── __tests__/        # Test files
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

## 🔒 Authentication

The application includes a complete authentication system with:
- User registration
- Login functionality
- Session persistence
- Protected routes for authenticated users
- Profile management

## 🌟 Future Enhancements

- Add more detailed country information and statistics
- Implement country comparison feature
- Add dark mode theme toggle
- Enhance user profiles with more customization options
- Add ability to create and share custom country collections

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [REST Countries API](https://restcountries.com/) for providing country data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set