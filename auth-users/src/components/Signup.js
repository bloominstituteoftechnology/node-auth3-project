import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: '',
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }
    submit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', this.state)
        .then ( res => {
            const token = res.data.token;
            localStorage.setItem('jwt', token);
            window.location.href='http://localhost:3000/users';
        })
        .catch ( err => console.log( err.message ));
    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <div>
                    <label>Username</label>
                    <input 
                        type = 'text'
                        name = 'username'
                        placeholder = 'username'
                        value={this.state.username}
                        onChange = {this.handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type = 'password'
                        name = 'password'
                        placeholder = 'password'
                        value = {this.state.password}
                        onChange = {this.handleChange}
                    />
                </div>
                <div>
                    <label>Department</label>
                    <input type = 'text'
                    name = 'department'
                    placeholder = 'department'
                    value={this.state.department}
                    onChange = {this.handleChange}
                />
                </div>
                <button type='submit'>Register</button>
            </form>
        );
    }
};

export default Signup;