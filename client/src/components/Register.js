import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        username: '',
        password: '',
        department: ''
    }

    inputHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/register', this.state)
            .then(res => {
                console.log('data', res.data)
                const token = res.data

                localStorage.setItem('jwt', token);
            })
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" value={this.state.username} onChange={this.inputHandler} type="text" id="username"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input name="password" value={this.state.password} onChange={this.inputHandler} type="password" id="password" />
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <input name="department" value={this.state.department} onChange={this.inputHandler} type="text" id="department" />
                </div>
                <button type="submit">Register</button>
            </form>
        )
    }
}

export default Register;