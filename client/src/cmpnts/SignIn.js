import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            responseMessage: '',
            loggedIn: false,
         }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = () => {
        const credentials={ username: this.state.username, password: this.state.password }
        axios
            .post('http://localhost:5500/auth/login', credentials)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.setState({ username: '', password: '', responseMessage: response.data, loggedIn: true })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() { 
        return ( 
            <form className="login-box">
                <input 
                    className="username-input"
                    onChange={this.handleInputChange}
                    placeholder="Enter Username"
                    name="username"
                    value={this.state.username}
                />
                <input
                    className="password-input"
                    onChange={this.handleInputChange}
                    placeholder="Enter Password"
                    name="password"
                    value={this.state.password}
                />
            </form>
        )
    }
}
 
export default SignIn;
