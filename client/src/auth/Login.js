import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component{
    state= {
        username:"",
        password: "",
    }

    render(){
        return (
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        name="username"
                        value ={this.state.username}
                        onChange={this.handleInputChange}>
                    </input>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        name="password"
                        value ={this.state.passwordusername}
                        onChange={this.handleInputChange}>
                    </input>
                </div>

                <div>
                    <button type ="submit">Sign In</button>
                </div>
            </form>
        )
    }

    handleInputChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const creds = this.state;
        const endpoint = 'http://localhost:6789/api/login';
        axios.post(endpoint, creds)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default Login