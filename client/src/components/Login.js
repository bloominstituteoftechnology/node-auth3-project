import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const initialUser = {
    username: '',
    password: ''
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: '',
            loggedIn: false,
        }
    }

    changeHandler = event => {
        const { name, value } = event.target;
        this.setState({ 
            user: { ...this.state.user, [name]: value } 
        });
    }

    logIn = event => {
        event.preventDefault();
        const {username, password} = this.state.user;
        if (!username || !password) {
            alert("Please enter a username and password");
        } else {
            axios.post('http://localhost:9000/api/login', this.state.user)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        localStorage.setItem('token', res.data.token);
                        this.setState({
                            loggedIn: true,
                            user: {...initialUser},
                        })
                    } else {
                        throw new Error('Something is wrong.');
                    }
                })
                .catch(err => {
                    this.setState({
                        message: 'Login failed.',
                        user: {...initialUser}  
                    })
                    console.dir(err);
                });
        }
        event.target.reset();
    }

    render() { 
        if (this.state.loggedIn === true) {
            return (
                <Redirect to='/'></Redirect>
            )
        }
        return (
            <div>
                <h1>Log in here!</h1>
                <form onSubmit={this.logIn}>

                    <input type='text' placeholder='username' name='username' value={this.value} onChange={this.changeHandler}/>

                    <input type='password' placeholder='password' name='password' value={this.value} onChange={this.changeHandler}/>

                    <input type='submit' />
                </form>
                <h4>{this.state.message !== '' ? this.state.message : null}</h4>
            </div>
        );
    }
}