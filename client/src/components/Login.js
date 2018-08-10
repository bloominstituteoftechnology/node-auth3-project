import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    inputHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault();

        const reqBody = {
            ...this.state
        }
        
        axios.post('http://localhost:3300/api/login', reqBody).then(res => {
            const token = res.data.token
            localStorage.setItem('jwt', token)
            this.props.history.push('users');
            console.log('data', res.data)
        }).catch(err => {
            console.log(err);
        })


        console.log('state', this.state);
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input name="username"
                            value={this.state.username}
                            onChange={this.inputHandler}
                            type="text" 
                            id="username"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input name="password"
                            value={this.state.password}
                            onChange={this.inputHandler}
                            type="password"
                            id="password" />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;