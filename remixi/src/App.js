import React, { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import Signup from './Signup';
import Login from './Login';
import HomePage from './HomePage';
import AddRating from './AddRating';

function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    
    const setUserSession = (user) => {
        setUsername(user);
        localStorage.setItem('username', user); // save to localStorage
    };

    return (
        <UserContext.Provider value={{ username, setUserSession }}>
            <Router>
                <AppContent 
                    showLogin={showLogin}
                    setShowLogin={setShowLogin}
                    showSignup={showSignup}
                    setShowSignup={setShowSignup}
                />
            </Router>
        </UserContext.Provider>
    );
}

function AppContent({
    showLogin,
    showSignup,
}) {
    const navigate = useNavigate();
    const { username } = useContext(UserContext);

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleSignupClick = () => {
        navigate('/signup');
    };


    return (
        <div className="App">
            <h1>Remixi Ratings App</h1>
            {!username && (
            <div>
                {showLogin ? (
                    <Login />
                ) : (
                    <button onClick={handleLoginClick}>Log In</button>
                )}
                {showSignup ? (
                    <Signup />
                ) : (
                    <button onClick={handleSignupClick}>Sign Up</button>
                )}
            </div>
            )}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-rating" element={<AddRating />} />
                <Route path="/homepage" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
