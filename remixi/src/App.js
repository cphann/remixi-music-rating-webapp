/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from 'react';
import HomePage from './homepage';
import Signup from './signup';
import Login from './Login';
import DisplayRating from './DisplayRating';
import AddRating from './AddRating';

function App() {
  return (
    <div className="App">
      <h1>Ratings App</h1>
      <HomePage />
      <Login />
      <Logout />
      <DisplayRatings /> {/* Example, you can fetch ratingId dynamically */}
      <AddRating />
      
    </div>
  );
}

export default App;