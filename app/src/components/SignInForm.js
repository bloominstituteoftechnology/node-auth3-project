import React, { Component } from 'react';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    inputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.logIn(user);
        this.props.history.push('/');
    }  

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type='text' name='username' value={this.state.username} onChange={this.inputHandler} placeholder="username" />
                <input type='text' name='password' value={this.state.password} onChange={this.inputHandler} placeholder="password" />
                <button type="submit">Log In</button>
            </form>
        );
    }
}

export default SignInForm;