import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    
    userLogout = () => {
        if(localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt');
            this.props.history.push('/');
        };
    };

    render() {
        return (
            <nav>
                <NavLink to="/" >Home</NavLink>
                &nbsp;|&nbsp;
                <NavLink to="/users" >Users</NavLink>
                &nbsp;|&nbsp;
                <NavLink to="/login" >Login</NavLink>
                &nbsp;|&nbsp;
                <NavLink to="/register" >Register</NavLink>
                &nbsp;|&nbsp;
                <button onClick={this.userLogout}>Logout</button>
            </nav>
        );
    }
    
};

export default Navigation;