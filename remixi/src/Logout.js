import React from 'react';
// If you are using React Router, import it:
// import { useHistory } from 'react-router-dom';

function Logout({ onLogout = () => {} }) {
  
  // If you're using React Router, get the history object:
  // const history = useHistory();

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
      
      // Clear any session or user data:
      localStorage.removeItem('userToken'); // If you store a token or user data in local storage, for instance
      
      // Give feedback:
      console.log("User has been logged out."); // For debugging
      // If you are using React Router, you can redirect:
      // history.push('/login'); // Redirect to login or any other page

      // If not using React Router, you can refresh or redirect using vanilla JavaScript:
      // window.location.href = '/login';
    } else {
      console.error("onLogout prop is not a function.");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;