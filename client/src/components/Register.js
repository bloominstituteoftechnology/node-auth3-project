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
            message: '',
            preventSubmit: true
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;

        this.setState({ user: { ...this.state.user, [name]: value } }, () => {
            if (name === 'username') {
                if (value.length > 2) {
                    axios.get(`${url}/api/checkUsername/${value}`)
                        .then(res => {
                            if (!this.state.preventSubmit) {
                                this.setState({
                                    preventSubmit: true,
                                    message: 'Username already exists'
                                })
                            }
                        })
                        .catch(err => {
                            if (err.response.status === 404) {
                                if (this.state.preventSubmit) {
                                    this.setState({
                                        preventSubmit: false,
                                        message: ''
                                    })
                                }
                            }
                        });
                }
            }
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
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Registration failure'
                });
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
                    <button type="submit" disabled={this.state.preventSubmit}>Submit</button>
                    {this.state.message ? <h4>{this.state.message}</h4> : null}
                </form>
            </div>
        )
    }
}

export default Register;