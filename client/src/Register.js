import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className="input-field">
                <h2>New User?</h2>
                <div className="label">
                <label>Username:</label>
                    <input className="text"type="text" name="username" required="true" placeholder="lightningBoltHarry"/>
                </div>
                <div className="label">
                <label>Password:</label>
                    <input className="text" type="password" name="password" required="true" placeholder="Must be at least 8 chars"/>
                </div>
                <div className="label">
                <label>Retype Password:</label>
                    <input className="text" type="password" required="true" name="password"/>
                </div>
                <div className="label">
                <label>Race:</label>
                    <input className="text" type="text" name="race" required="true" placeholder="e.g. wizard, muggle, hippogriff, etc."/>
                </div>
                <button className="log-button">Register User</button>
                <div className="register-link"><Link to="/login" className="link-style">Already have an account? Log in here.</Link></div>

            </div>
        );
    }
}

export default Register;
