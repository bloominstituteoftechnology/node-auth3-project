import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            department: '',
            failedSignup: false
        };
    }

    submit = (event)=>{
        event.preventDefault();
        const body = {
            username: this.state.username,
            password: this.state.password,
            department: this.state.department
        }
        axios.post('http://localhost:3300/api/register', body)
        .then(res=>{
            console.log(this.state);
            localStorage.setItem('jwt', res.data.token);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('department', this.state.department);
            this.props.history.push('/users');
        })
        .catch(error=>{
            this.setState({
                failedSignup: true
            })
        })
    }

    handleInput = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
        <form onSubmit={this.submit}>
            <h1>Sign Up</h1>
            <div>
                <label>Username:</label>
                <input type="text" name="username" onChange={this.handleInput} placeholder="username..." value={this.state.username}></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={this.handleInput} placeholder="password..." value={this.state.password}></input>
            </div>
            <div>
                <label>Department:</label>
                <input type="text" name="department" onChange={this.handleInput} placeholder="department..." value={this.state.department}></input>
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            <div>
                {this.state.failedSignup ? 'Please include a valid username, password and department' : null}
            </div>
        </form>
        );
    }
}

export default SignUp;