import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
    return (
        <nav>
            <NavLink to="/" >Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users" >Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login" >Login</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/register" >Register</NavLink>
        </nav>
    );
};

export default Navigation;