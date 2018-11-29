import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

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
            preventSubmit: true,
            redirect: false
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
        if(!this.state.preventSubmit && this.state.user.username && this.state.user.password && this.state.user.department){
        axios.post(`${url}/api/register`, this.state.user)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        message: 'Registration successful',
                        user: { ...initialUser },
                        redirect: true
                    });
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Registration failure'
                });
            });
        } else {
            alert('No empty fields');
        }
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
                <Link to='/login'>I already have an account</Link>
                {this.state.redirect ? <Redirect to='/login' /> : null}
            </div>
        )
    }
}

export default Register;