import React, { Component } from 'react';
import axios from 'axios';

const url = 'http://localhost:9000';

const initialUser = {
    username: '',
    password: '',
    department:''
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: { ...initialUser },
        message: '',
        };
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitHandler = (event) => {
        event.preventDefault();

        axios.post(`${url}/api/register`, this.state.user)
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    message: 'Registration Successful',
                    user: { ...initialUser },
                });
            } else {
                throw new Error();
            }
        })
        .catch((err) => {
            this.setState({
            message: 'Registration failed.',
            user: { ...initialUser },
            });
        });
    }

    render() {
        return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={this.submitHandler}>

            <input
                type="text"
                id="username"
                name="username"
                value={this.state.user.username}
                onChange={this.inputHandler}
                placeholder="username"
            />

            <input
                type="text"
                id="password"
                name="password"
                value={this.state.user.password}
                onChange={this.inputHandler}
                placeholder="password"
            />

            <input
                type="text"
                id="department"
                name="department"
                value={this.state.user.department}
                onChange={this.inputHandler}
                placeholder="department"
            />
            <button type="submit">Submit</button>
            </form>
            { this.state.message ? (<h4>{this.state.message}</h4>) : (<h4>Registration Failed</h4>)}
        </div>

        );
    }
}
