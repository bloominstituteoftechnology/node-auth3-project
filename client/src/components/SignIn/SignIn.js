import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
    render() {
        return (
            <div className='form-wrapper'>
                <h2 className='header'>Welcome</h2>
                <input className='input-box'
                    type = 'text'
                    name = 'username'
                    placeholder = 'Username'
                />
                <input className='input-box'
                    type = 'text'
                    name = 'password'
                    placeholder = 'Password'
                />
                <button className='btn'>Continue</button>            
                <p>Don't have an accout?<span><Link to="/register">Sign Up Here!</Link> </span></p>                        
            </div>
        );
    }
}

export default SignIn;