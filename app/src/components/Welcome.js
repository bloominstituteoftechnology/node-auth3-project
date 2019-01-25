import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export class Welcome extends Component {
    render() {
        return (
            <div>
                <p className="title">Welcome to the Authentication Page</p>
                <NavLink to='/signup' style={{ color: 'white' }}>
                    <h4>Sign up</h4>
                </NavLink>
                <NavLink to='/login'style={{ color: 'white' }}>
                    <h4>Log in</h4>
                </NavLink>
                <NavLink to='/users'style={{ color: 'white' }}>
                    <h4>Users</h4>
                </NavLink>
            </div>
        )
    }
}

export default Welcome;
