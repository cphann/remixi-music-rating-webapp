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
import Signup from './Signup';
import Login from './Login';
// import Logout from './logout';
//import HomePage from './homepage';
// import ViewRating from './viewrating';
// import AddRating from './addrating.js';
// import UpdateRating from './updaterating';
// import DeleteRating from './deleterating';

function App() {
  return (
    <div className="App">
      <h1>Remixi Ratings App</h1>
      <Login />
      <Signup />
    </div>
  );
}

export default App;