import React, { Component } from 'react';
import axios from "axios";

export class LogIn extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            authenticated: null
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
            .post("http://localhost:2323/api/login", user)
            .then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    localStorage.setItem('jwt', res.data.token);
                    this.setState({
                        username: '',
                        password: ''
                    });
                    this.props.history.push('/users');
                } else {
                    this.setState({
                        authenticated: false
                    })
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div >
                <p className="title">Log In Here</p>
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
                <button onClick={this.handleSubmit} className="login-button">Log in</button>
                <p className ={this.state.authenticated===false ? "warning" : "hide"} >Invalid Username or Password!</p>
            </div>
        )
    }
}

export default LogIn;
