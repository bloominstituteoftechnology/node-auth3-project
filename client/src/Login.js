import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Login extends Component {
    render() {
        return (
            <div className="input-field">
                <h2>Log-in to enter</h2>
                <div className="label">
                    <label>Username:</label>
                    <input className="text"type="text" name="username"/>
                </div>
                <div className="label">
                    <label>Password:</label>
                    <input className="text" type="password" name="password"/>
                </div>
                <button className="log-button"><Link to="/vip/users" className="link-style">Log-In Here</Link></button>
                <div className="register-link"><Link to="/register" className="link-style">New User? Register Here!</Link></div>


            </div>
        );
    }
}

export default Login;
