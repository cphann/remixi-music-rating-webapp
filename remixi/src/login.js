import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const { setUserSession } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost/comp333_hw3/backend/index.php/user/login', {
                username: username,
                password: password
            });
            if (response.data.message) {
                if (response.data.message === 'Login successful') {
                    setUserSession(username); // Set the user in context after successful login
                    setErrorMessage(response.data.message);
                    navigate('/homepage');
                }
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("An error occurred while trying to log in.");
            }
        }
    };

    return (
            <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div>
                <button type="submit">Sign In</button>
                </div>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            </div>
    );
};
