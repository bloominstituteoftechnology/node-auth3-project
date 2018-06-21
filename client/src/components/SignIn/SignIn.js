import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
    state = {
        username: 'Sam',
        password: 'passSam'
    }

    submitForm = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5500/api/auth/login', this.state)
            .then(res => {
                console.log('response:', res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div onSubmit={this.submitForm} className='container'>
                <div className='form-wrapper'>
                    <h1 className='header'>Welcome</h1>
                    <label htmlFor='username' />
                    <input className='input-box'
                        type = 'text'
                        name = 'username'
                        placeholder = 'Username'
                        value = {this.state.username}
                        onChange = {this.handleInput}
                    />
                    <label htmlFor='password' />
                    <input className='input-box'
                        type = 'password'
                        name = 'password'
                        placeholder = 'Password'
                        value = {this.state.password}
                        onChange = {this.handleInput}
                    />                
                    <button  onClick={this.submitForm} className='btn'>Continue</button>            
                    <p>Don't have an accout?<span><Link to="/register">Sign Up Here!</Link> </span></p>                        
                </div>
            </div>
        );
    }
}

export default SignIn;