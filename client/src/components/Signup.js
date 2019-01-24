import React, { Component } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

class Signup extends Component {
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

        const endPoint = `${apiUrl}/register`;

        axios
            .post(`${endPoint}`, this.state)
            .then(res => {
                console.log(res);
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
                    <input
                        type="text"
                        name="department"
                        value={this.state.department}
                        onChange={this.handleChange}
                    />
                    <br />
                    <button type="submit">Signup</button>
                </form>
            </div>
        );
    }
}

export default Signup;
