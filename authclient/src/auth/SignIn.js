import React, { Component } from 'react';
import { Route } from 'react-router-dom'

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    signin = e => {
        e.preventDefault();
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="App">

                <form onSubmit={this.signin}>
                    <div>Username <input name='username' onChange={this.handleChange} value={this.state.username} type='text' /></div>
                    <div>Password <input name='password' onChange={this.handleChange} value={this.state.password} type='password' /></div>
                    <div><button type='submit'>Sign In</button></div>
                </form>


            </div>

        );
    }
}

export default SignIn;
