import React, { Component } from 'react';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    inputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password,
            department: this.state.password
        };

        this.props.addNewUser(user);
        this.props.history.push('/');
    }   

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type='text' name='username' value={this.state.username} onChange={this.inputHandler} placeholder="username" />
                <input type='text' name='password' value={this.state.password} onChange={this.inputHandler} placeholder="password" />
                <input type='text' name='department' value={this.state.department} onChange={this.inputHandler} placeholder="department" />
                <button type="submit">Create User</button>
            </form>
        );
    }
}

export default SignUpForm;