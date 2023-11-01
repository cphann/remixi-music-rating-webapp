import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    // Clear any session or user data
    // Redirect or perform other actions on logout
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;