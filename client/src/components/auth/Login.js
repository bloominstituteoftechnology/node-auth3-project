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
            localStorage.setItem('jwt', res.data.token);
            this.props.setDepartment(res.data.department);
            
            this.props.history.push('/users');
        }).catch(err => {
            console.log('LOGIN ERROR', err.response.data.message);
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
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        );
    };
}

export default Login;