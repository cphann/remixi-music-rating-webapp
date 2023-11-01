import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://your-backend-url/user/register', {
        username: username,
        password: password,
        confirm_password: confirmPassword,
      });

      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else if (response.data && response.data.error) {
        setMessage(response.data.error);
      } else {
        setMessage('Successfully signed up! You can now log in.');
      }
    } catch (error) {
      setMessage('Error during signup. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;