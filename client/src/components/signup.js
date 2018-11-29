import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                username: '',
                password: '',
                department: ''
            },
        };
    }

    registration = (ev) => {
        ev.preventDefault();
        axios
        .post('http://localhost:9000/api/register', this.state.userInfo)
        .then(id => console.log(id))
        .catch(err => console.log(err))
    }

    inputChangeHandler = (ev) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [ev.target.name]: ev.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.registration}>
                    <input type='text' placeholder='Username' name='username' onChange={this.inputChangeHandler}/>
                    <input type='text' placeholder='Password' name='password' onChange={this.inputChangeHandler}/>
                    <input type='text' placeholder='Department' name='department' onChange={this.inputChangeHandler}/>
                    <button onClick={this.registration}>Register</button>
                </form>
            </div>
        )
     }
}

export default SignUp;