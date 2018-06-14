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

    login = event => {
        event.preventDefault();
        const credentials={ username: this.state.username, password: this.state.password }
        console.log("credentials:", credentials)
        axios
            .post('http://localhost:5500/api/auth/login', credentials)
            .then(response => {
                console.log("response:", response.data)
                localStorage.setItem('jwt', response.data.token);
                this.setState({ username: '', password: '', responseMessage: response.data, loggedIn: true })
                this.props.history.push('/users');
            })
            .catch(error => {
                console.log("here:", error)
            })
    }

    render() { 
        return ( 
            <div>
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
                <button 
                    className="login-button"
                    onClick={this.login}
                >
                Login
                </button>
            </div>
        )
    }
}
 
export default SignIn;
