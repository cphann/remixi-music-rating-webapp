import React, { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext'; // Context for user session state
import Signup from './Signup'; // Signup component
import Login from './Login'; // Login component
import HomePage from './HomePage'; // Home page component
import ViewRating from './ViewRating'; // Component to view a single rating
import AddRating from './AddRating'; // Component to add a new rating
import SearchRating from './SearchRating'; // Component to search ratings
import UpdateRating from './UpdateRating'; // Component to update a rating

function App() {
    // State for username, initially loaded from localStorage
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    
    // Function to set user session on login and save to localStorage
    const setUserSession = (user) => {
        setUsername(user);
        localStorage.setItem('username', user);
    };

    // UserContext.Provider provides the context to the component tree
    return (
        <UserContext.Provider value={{ username, setUserSession }}>
            <Router> // Using HashRouter for routing
                <AppContent /> // Component that contains the main content and navigation
                <Routes> // Route configuration for the app
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/add-rating" element={<AddRating />} />
                    <Route path="/search" element={<SearchRating />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/view-rating/:id" element={<ViewRating />} />
                    <Route path="/update-rating/:id" element={<UpdateRating />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

// AppContent contains the top-level application content and navigation
function AppContent() {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { username, setUserSession } = useContext(UserContext); // Access context

    // Navigate to login page
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Navigate to signup page
    const handleSignupClick = () => {
        navigate('/signup');
    };

    // Handle user logout
    const handleLogout = () => {
        setUserSession(null); // Clear user session
        localStorage.removeItem('username'); // Clear localStorage
        navigate('/login'); // Navigate to login page
    };

    // JSX for the main app content
    return (
        <div className="App">
            <h1>Remixi Ratings App</h1>
            <div>
                {!username && ( // Show login and signup if no user is logged in
                    <div>
                        <button onClick={handleLoginClick}>Log In</button>
                        <button onClick={handleSignupClick}>Sign Up</button>
                    </div>
                )}
                {username && ( // Show logout if user is logged in
                    <div>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;