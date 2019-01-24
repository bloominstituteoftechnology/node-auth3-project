import React, { Component } from 'react';
import axios from 'axios';

const endPoint = 'http://localhost:5000/api/';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: 'testing2',
            password: '123445',
            department: 'accounting',
        };
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        axios
            .post(`${endPoint}login`, this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="department">Department: </label>
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;
