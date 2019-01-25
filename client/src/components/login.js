import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    };

    inputHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    } 

    submitHandler = (e) => {
        e.preventDefault();
        const creds = this.state;
        const endpoint = 'http://localhost:5000/api/login';
        axios.post(endpoint, creds)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='username' value={this.state.username} onChange={this.inputHandler} placeholder='username' />
                    <input type='text' name='password' value={this.state.password} onChange={this.inputHandler} placeholder='password' />
                    <input type='submit' value='submit' />
                </form>
            </div>
        )
    }
};

export default Login;