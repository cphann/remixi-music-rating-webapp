import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext';
import Signup from './Signup';
import Login from './Login';
import HomePage from './HomePage';
import AddRating from './AddRating';
import { Link } from 'react-router-dom';

function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    const setUserSession = (user) => {
        setUsername(user);
        localStorage.setItem('username', user); // save to localStorage
    };

    /*                    <div className="navigation">
                        <Link to="/login">Login</Link>
                        {' | '}
                        <Link to="/signup">Signup</Link>
                        {' | '}
                        <Link to="/add-rating">Add Rating</Link>
                    </div>
    */

    return (
      
        <UserContext.Provider value={{ username, setUserSession }}>
            <Router>
                <div className="App">
                    <h1>Remixi Ratings App</h1>

                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-rating" element={<AddRating />} />
                        <Route path="/homepage" element={<HomePage />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
