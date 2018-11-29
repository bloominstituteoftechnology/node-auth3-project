import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
  a {
    color: #2d2d2d;
  }

  .active {
    color: #fff;
  }
`;

class Navbar extends Component {
  state = {};
  handleClick = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    return (
      <StyledNav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <button onClick={this.handleClick}>Logout</button>
      </StyledNav>
    );
  }
}

export default Navbar;
