import React, { Component } from 'react';

const initialUser = {
    username: '',
    password: ''
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    inputHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ user: { ...this.state.user, [name]: value}});
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.user);
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={this.state.user.username}
                    onChange={this.inputHandler}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={this.state.user.password}
                    onChange={this.inputHandler}
                />
                <button type="submit">Login</button>
            </form>
        )
    }
}

export default Login;