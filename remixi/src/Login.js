import React, { useState } from 'react';
import axios from 'axios';

export default function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost/comp333_hw3/backend/index.php/user/login', {
                username: username,
                password: password
            });
            if (response.data.message) {
                setErrorMessage(response.data.message);
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
                <button type="submit">Sign Up</button>
                </div>
            </form>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};
