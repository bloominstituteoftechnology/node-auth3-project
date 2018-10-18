import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        username: '',
        password: '',
        department: '',
        error: '',
    };

    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:4000/api/register';
        axios.post(endpoint, this.state).then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/users');
        }).catch(err => {
            console.log('REGISTER ERROR', err.response.data.message);
            this.setState({error: err.response.data.message});
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                </div>
                <div>
                    <label htmlFor="department">Department</label>
                    <input type="text" name="department" value={this.state.department} onChange={this.handleInput} />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
                <div>
                    <h2>{!this.state.error === null || !this.state.error === '' ? `` : `${this.state.error}`}</h2>
                </div>
            </form>
        );
    };
}

export default Register;