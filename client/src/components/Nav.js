import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <NavLink to="/" exact>
          Home
        </NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/users">Users</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/signin">Signin</NavLink>
        &nbsp;|&nbsp;
        <button onClick={this.signout}>Signout</button>
      </nav>
    );
  }
}

export default Nav;
