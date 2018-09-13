import React, { Component } from 'react';


class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    noRefresh = e =>{
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit = {this.noRefresh}>
                <div>
                    <label>Username</label>
                    <input name = 'username' value = {this.state.username} onChange = {this.handleChange} type="text"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name = 'password' value = {this.state.password} onChange = {this.handleChange} type="password"></input>
                </div>
                <div>
                    <button type = "submit">Sign In</button>
                </div>
            </form>
            );
    }
}

export default Login;