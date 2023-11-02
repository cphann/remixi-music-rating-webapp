// React and necessary hooks are imported for component and state management
import React, { useState, useContext } from 'react';
// Axios is used for HTTP requests
import axios from 'axios';
// UserContext is imported to access and update the user's session data
import UserContext from './UserContext';
// useNavigate hook from react-router-dom to redirect the user after login
import { useNavigate } from 'react-router-dom';

// Define the Login functional component
export default function Login () {
    // Use the UserContext to set the user's session
    const { setUserSession } = useContext(UserContext);
    // useState hook to manage username, password and error message states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // useNavigate hook to programmatically navigate the user after login
    const navigate = useNavigate(); 

    // Function to handle the login when the form is submitted
    const handleLogin = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        try {
            // Make an HTTP POST request to the backend for login
            const response = await axios.post('http://localhost/comp333_hw3/backend/index.php/user/login', {
                username: username,
                password: password
            });
            // Check the response from the server for a message
            if (response.data.message) {
                // If the login is successful, update the user's session
                if (response.data.message === 'Login successful') {
                    setUserSession(username); // Set the user in context
                    setErrorMessage(response.data.message); // Display a success message
                    navigate('/homepage'); // Redirect to the homepage
                }
            }
        } catch (error) {
            // Catch any errors during the login process and set error messages appropriately
            if (error.response) {
                setErrorMessage(error.response.data.error); // Display error message from the server
            } else {
                setErrorMessage("An error occurred while trying to log in."); // Display generic error message
            }
        }
    };

    // Render the login form
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    {/* Input for username */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required // This field is required to submit the form
                    />
                </div>
                <div>
                    {/* Input for password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required // This field is required to submit the form
                    />
                </div>
                <div>
                    {/* Button to submit the form */}
                    <button type="submit">Sign In</button>
                </div>
            </form>
            {/* Display any error messages */}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};