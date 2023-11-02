import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext'; // Import the context you're using

function Logout() {
  const navigate = useNavigate();
  const { setUserSession } = useContext(UserContext); // Use the context to clear the user session

  const handleLogout = async () => {
    try {
      // Send a logout request to your API
      await axios.post('http://localhost/comp333_hw3/backend/index.php/user/logout');

      // Upon successful logout, clear user session and tokens
      setUserSession(null); // Clear the user in context
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('userSession');

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      // If there's an error, handle it here (e.g., log it, display a message)
      console.error("Logout failed", error);
      // You could also set an error message state and display it as done in the Login component
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;