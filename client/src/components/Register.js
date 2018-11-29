import React from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: '',
    department: ''
}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;

        this.setState({
            user: { ...this.state.user, [name]: value }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/register`, this.state.user)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        message: 'Registration successful',
                        user: { ...initialUser }
                    });
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                if (err.errno === 19) {
                    this.setState({
                        message: 'Username already exists'
                    });
                } else {
                    this.setState({
                        message: 'Registration failure'
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        placeholder="Username"
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        placeholder="Password"
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={this.state.user.department}
                        placeholder="Department"
                        onChange={this.inputHandler}
                    />
                    {this.state.message ? <h4>{this.state.message}</h4> : null}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;