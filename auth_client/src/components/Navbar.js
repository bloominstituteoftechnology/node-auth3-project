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
          <NavLink to="/users" className="App-link">
            Users
          </NavLink>
          <NavLink to="/signin" className="App-link">
            Sign In
          </NavLink>
          <NavLink to="/register" className="App-link">
            Register
          </NavLink>
          <button onClick={this.signout}>Log Out</button>
        </nav>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem('jwt');
    // window.location.reload();
  };
}

export default Navbar;
