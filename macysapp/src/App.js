import React from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Hi, Welcome to the William H. Macy's Department Store Employee Server!</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up!</NavLink>
        <NavLink to="/signin">Sign In!</NavLink>
        <NavLink to="/userlist">List of Users!</NavLink>
      </nav>
      </header>
      <body>
        <h2>Please choose a link from above to get started!</h2>
        <h4><strong>Instructions:</strong></h4>
        <p></p>
      </body>
    </div>
  );
}

export default App;
