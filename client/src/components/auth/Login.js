import React, { Component } from 'react';
import axios from 'axios';
import './auth.css';

class Login extends Component {
    state = {
        username: '',
        password: '',
        loggingIn: false,
    };

    handleInput = e => {
        this.setState({loggingIn: false})
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:4000/api/login';

        axios.post(endpoint, this.state).then(res => {
            this.setState({loggingIn: true})
            localStorage.setItem('jwt', res.data.token);
            this.props.setDepartment(res.data.department);
            
            this.props.history.push('/users');
            
        }).catch(err => {
            console.log('LOGIN ERROR', err.response.data.message);
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="login">
                <h1>Login</h1>
                <div className="Input">
                    
                    <input type="text" id="username" className="Input-text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
                    <label for="username" className="Input-label">Username</label>
                </div>
                <div className="Input">
                    <input type="password" id="password" placeholder="password" className="Input-text" name="password" value={this.state.password} onChange={this.handleInput} />
                    <label for="password" className="Input-label">Password</label>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    {this.state.loggingIn ? 'Logging In' : ''}
                </div>
            </form>
        );
    };
}

export default Login;