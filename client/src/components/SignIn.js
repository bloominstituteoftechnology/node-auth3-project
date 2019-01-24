import React, { Component } from 'react';
import axios from 'axios';



class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    submit = (event)=>{
        event.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:3300/api/login', this.state)
        .then(res=>{
            this.props.history.push('/users');
            localStorage.setItem('jwt', res.data.token);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    handleInput = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
        <form onSubmit={this.submit}>
            <h1>Sign In</h1>
            <div>
                <label>Username:</label>
                <input type="text" name="username" onChange={this.handleInput} placeholder="username..." value={this.state.username}></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={this.handleInput} placeholder="password..." value={this.state.password}></input>
            </div>
            <div>
                <button type="submit">Sign In</button>
            </div>
        </form>
        );
    }
}

export default SignIn;