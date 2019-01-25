import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = () => {
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        axios
            .post("http://localhost:2323/api/register", user)
            .then(res => {
                console.log(res.data);
                this.setState({
                    username: '',
                    password: ''
                });
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="App">
                <div className="login-container">
                    <div className="login-box">
                        <p className="title">Sign Up Here</p>
                        <form onSubmit={this.handleSubmit} className="loginInput">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleInput}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInput}
                            />
                        </form>
                        <NavLink to='/'>
                            <button onClick={this.handleSubmit} className="login-button">Sign up</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
