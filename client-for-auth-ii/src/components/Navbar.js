import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  height: 50px;
  background: #fff;
  box-shadow: 0 3px 6px -6px rgba(0, 0, 0, 0.2);
  .container {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    width: 70%;
    margin: 0 auto;
    height: 100%;
    a {
      color: #2d2d2d;
      margin-right: 3rem;
      &:first-child {
        margin-right: auto;
      }
    }
    button {
      padding: 1rem;
      border: none;
      font-size: inherit;
      font-weight: 300;
      cursor: pointer;
    }

    .active {
      color: #42a6eb;
    }
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
        <div className="container">
          <NavLink exact to="/">
            Home
          </NavLink>
          {!this.props.loggedIn ? (
            <NavLink to="/register">Register</NavLink>
          ) : null}
          {!this.props.loggedIn ? <NavLink to="/login">Login</NavLink> : null}
          {this.props.loggedIn ? (
            <button onClick={this.handleClick}>Logout</button>
          ) : null}
        </div>
      </StyledNav>
    );
  }
}

export default Navbar;
