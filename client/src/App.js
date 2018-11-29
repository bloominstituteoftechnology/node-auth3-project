import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/signup'>SignUp</NavLink>
          <NavLink to='/signin'>Signin</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </nav>
      </div>
    );
  }
}

export default App;
