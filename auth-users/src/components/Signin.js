import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }
    submit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', this.state)
            .then ( res => {
                const token = res.data.token;
                localStorage.setItem('jwt', token)
            })
            .catch (err => console.log( err.message ));
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
              <button type='submit'>Login</button>
            </form>
        );
    }
};

export default Signin;