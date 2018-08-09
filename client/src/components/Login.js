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

        axios.post('http://localhost:3000/login', this.state)
        .then(res => {
            console.log('data', res.data);
        }).catch(err => {
            console.error('Axios failed');
        })

        console.log('state', this.state);
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input name="username"
                            value={this.state.username}
                            onChange={this.inputHandler}
                            type="text" />
                    </div>
                    <div>
                        <input name="password"
                            value={this.state.password}
                            onChange={this.inputHandler}
                            type="text" />
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