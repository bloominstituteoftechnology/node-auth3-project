import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    state = {
        username: "",
        password: "",
        department: ""
    };

    render() {
        return (
        <form onSubmit={this.handleSubmit}>

            <div className="form-username">
            <label htmlFor="username">Username</label>
            <input
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
            />
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="text"
            />
            </div>

            <div>
            <label htmlFor="department">Department</label>
            <input
                name="department"
                value={this.state.department}
                onChange={this.handleChange}
                type="text"
            />
            </div>

            <div>
            <button type='submit'>Register</button>
            </div>

        </form>
        );
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const creds = this.state;
        const endpoint = 'http://localhost:4200/api/register';
        axios.post(endpoint, creds)
        .then(res => {
            console.log('response data: ', res.data);
            localStorage.setItem('jwt', res.data.token)
            this.props.history.push('/users');
        })
        .catch(err => {
            console.log('Error from Login', err)
        })
    }
}

export default Signup;