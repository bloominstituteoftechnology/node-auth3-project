import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        username: '',
        password: '',
        department: '',
        error: '',
        isError: false,
    };

    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:4000/api/register';
        const username = {username: this.state.username};
        const password = {password: this.state.password};
        const department = {department: this.state.department};
        const user = Object.assign(username, password, department);
        
        axios.post(endpoint, user).then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.props.setDepartment(this.state.department);

            this.props.history.push('/users');
        }).catch(err => {
            console.log('REGISTER ERROR', err.response);
            this.setState({error: err.response.data.message, isError: true});
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
                    <h2>{this.state.isError ? `${this.state.error}` : ``}</h2>
                </div>
            </form>
        );
    };
}

export default Register;