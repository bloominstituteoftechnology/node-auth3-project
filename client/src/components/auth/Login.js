import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:4000/api/login';
        axios.post(endpoint, this.state).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log('LOGIN ERROR', err);
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleInput} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        );
    };
}

export default Login;