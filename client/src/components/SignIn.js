import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };

    signInUser = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:4040/api/login`, this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
            })
            .catch(err => console.log(err));
        this.setState({
            username: '',
            password: '',
        });
    }

    handleInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <div>
                <h2>Sign in!</h2>
                <form onSubmit={this.signInUser}>
                <input
                    onChange={this.handleInput}
                    placeholder='Username'
                    value={this.state.username}
                    name='username'
                />
                <input
                    onChange={this.handleInput}
                    placeholder='Password'
                    value={this.state.password}
                    name='password'
                />
                <button type='submit'>Sign in!</button>
                </form>
            </div>
            
        )
    }
}

export default SignIn;
