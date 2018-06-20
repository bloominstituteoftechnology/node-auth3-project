import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="input-field">
                <h2>Log-in to enter</h2>
                <input className="text"type="text" name="username"/>
                <input className="text" type="password" name="password"/>
                <button className="log-button">Log-In Here</button>
            </div>
        );
    }
}

export default Login;
