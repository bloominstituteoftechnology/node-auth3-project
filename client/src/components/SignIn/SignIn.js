import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
    render() {
        return (
            <div className='container'>
            <div className='form-wrapper'>
                <h1 className='header'>Welcome</h1>
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
                <button className='btn'><Link to='/users'>Continue</Link></button>            
                <p>Don't have an accout?<span><Link to="/register">Sign Up Here!</Link> </span></p>                        
            </div>
            </div>
        );
    }
}

export default SignIn;