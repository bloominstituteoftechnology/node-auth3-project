import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="input-field">
                <h1>Enter Here</h1>
                <input className="text"type="text" name="username"/>
                <input className="text" type="password" name="password"/>
                <button className="log-button">ENTER</button>
            </div>
        );
    }
}

export default Login;
