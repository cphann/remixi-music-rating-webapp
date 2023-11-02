import React, { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import Signup from './Signup';
import Login from './Login';
import HomePage from './HomePage';
import ViewRating from './ViewRating';
import AddRating from './AddRating';

function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    
    const setUserSession = (user) => {
        setUsername(user);
        localStorage.setItem('username', user); // save to localStorage
    };

    return (
        <UserContext.Provider value={{ username, setUserSession }}>
            <Router>
                <AppContent />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-rating" element={<AddRating />} />
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/view-rating/:id" element={<ViewRating />} />
                    </Routes>
            </Router>
        </UserContext.Provider>
    );
}

function AppContent() {
    const navigate = useNavigate();
    const { username, setUserSession } = useContext(UserContext); // Now this should work as setUserSession is provided in context

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleSignupClick = () => {
        navigate('/signup');
    };

    // You can also handle logout here or in another component
    const handleLogout = () => {
        setUserSession(null);
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div className="App">
            <h1>Remixi Ratings App</h1>
            <div>
                {!username && (
                    <div>
                        <button onClick={handleLoginClick}>Log In</button>
                        <button onClick={handleSignupClick}>Sign Up</button>
                    </div>
                )}
                {/* If you want to display logout button when user is logged in */}
                {username && (
                    <div>
                        {/* Display user info and logout button */}
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
