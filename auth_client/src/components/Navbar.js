import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="App App-header">
          <NavLink to="/" className="App-link">
            Home
          </NavLink>
          <NavLink to="/" className="App-link">
            Users
          </NavLink>
          <NavLink to="/signin" className="App-link">
            Sign In
          </NavLink>
          <NavLink to="/" className="App-link">
            Register
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default Navbar;
