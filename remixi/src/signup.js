// Import necessary hooks and axios for making HTTP requests
import React, { useState } from 'react';
import axios from 'axios';

// Define the SignUp functional component
function SignUp() {
  // Use the useState hook to create state variables for username, password, confirmPassword, and message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // handleSignUp is the function that will be called when the sign-up form is submitted
  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the password and confirmPassword match, if not set a message
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Attempt to send a POST request to the server with the username and password
      const response = await axios.post('http://localhost/comp333_hw3/backend/index.php/user/register', {
        username: username,
        password: password,
        confirm_password: confirmPassword,
      });

      // Process the response from the server
      if (response.data && response.data.message) {
        // If the server responds with a message, set it to be displayed
        setMessage(response.data.message);
      } else if (response.data && response.data.error) {
        // If the server responds with an error, set it to be displayed
        setMessage(response.data.error);
      } else {
        // If the sign-up was successful without specific messages, inform the user
        setMessage('Successfully signed up! You can now log in.');
      }
    } catch (error) {
      // Handle any errors that occur during the POST request
      if (error.response && error.response.data && error.response.data.error) {
          setMessage(error.response.data.error); // Display server-provided errors
      } else {
          setMessage('Error during signup. Please try again.'); // Display generic error message
      }
    }
  };

  // The component returns JSX to render the sign-up form
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* Input fields for username, password, and confirmPassword */}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {/* Sign up button */}
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      {/* Display any messages that are set */}
      {message && <p>{message}</p>}
    </div>
  );
}

// Export the SignUp component for use in other parts of the app
export default SignUp;