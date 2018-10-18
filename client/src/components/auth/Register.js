import React, { Component } from 'react';
import axios from 'axios';
import './auth.css';

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
            <form onSubmit={this.handleSubmit} className="login">
                <h1>Register</h1>
                <div className="Input">
                    <input type="text" id="username" className="Input-text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
                    <label for="username" className="Input-label">Username</label>
                </div>
                <div className="Input">
                    <input type="password" id="password" placeholder="password" className="Input-text" name="password" value={this.state.password} onChange={this.handleInput} />
                    <label for="password" className="Input-label">Password</label>
                </div>
                <div className="Input">
                    <input type="text" id="department" placeholder="department" className="Input-text" name="department" value={this.state.department} onChange={this.handleInput} />
                    <label for="department" className="Input-label">Department</label>
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