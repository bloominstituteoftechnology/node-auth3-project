import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

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
                <div className="left">
                    <NavLink to="/" >Home</NavLink>
                    &nbsp;&nbsp;
                    <NavLink to="/users" >Users</NavLink>
                    &nbsp;&nbsp;
                    <NavLink to="/login" >Login</NavLink>
                    &nbsp;&nbsp;
                    <NavLink to="/register" >Register</NavLink>
                </div>
                
                <div className="right">
                <button onClick={this.userLogout}>Logout</button>
                </div>
                
            </nav>
        );
    }
    
};

export default Navigation;