import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        
    }


    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        let address = `http://localhost:9000/api/login`;

        axios.post(address, user)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('jwt', res.data.token);
            this.props.history.replace('/users');
        })
        .catch(err => {
            console.error(err)
        })
    }
        
    render() {
        return (
            <div>

            <form onSubmit={this.handleLogin}>
                <input type = 'text' name = 'username' value = {this.state.username} placeholder='username' onChange={this.handleInput}></input>
                <input type='password' name = 'password' value = {this.state.password} placeholder = 'password' onChange={this.handleInput}></input>
                <button>Login</button>
            </form>

            </div>
        )
    }
}

export default withRouter(Login);