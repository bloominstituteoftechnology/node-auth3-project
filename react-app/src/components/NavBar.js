import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

function NavBar(props) {
    const signout=()=>{
        console.log('triggered signout')
        localStorage.removeItem('jwt');
        props.history.push('/')
    }
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/signin">Login</NavLink>
        <button onClick={signout}>Sign Out</button>
      </nav>
    );
  }

  export default NavBar;