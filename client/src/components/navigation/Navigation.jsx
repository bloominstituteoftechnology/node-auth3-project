import React from 'react';
import { NavLink, Route } from 'react-router-dom';

function Navigation(props) {
    return (
        <nav>
            <NavLink to="/" >Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users" >Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login" >Login</NavLink>
        </nav>
    );
};

export default Navigation;