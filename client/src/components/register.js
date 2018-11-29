import React, { Component } from 'react';
import axios from 'axios';
import '../index.css'

const url = process.env.REACT_APP_API_URL

const initialUser = {
    username: '',
    password: ''
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {...initialUser},
            message: '',
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: {...this.state.user, [name]: value}})
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/register`, {...this.state.user, department: 'default'})
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        message: 'Registration Successful',
                        user: {...initialUser },
                    })
                    this.props.history.push("/");
                } else {
                   throw new Error();
                }
            })
            .catch (err => {
                this.setState ({
                    message: 'Registration Failed...',
                    user: { ...initialUser},
                })
            })
    }

    render() {
        return (
            <div>
                <h1> Sign Up </h1>
                <form onSubmit={this.submitHandler}>
                <label htmlFor = 'username'> Username </label>
                <input 
                    type = 'text' 
                    id='username'
                    name='username' 
                    value={this.state.username}
                    onChange = {this.inputHandler}
                />
                <label htmlFor = 'password'> Password </label>
                <input 
                    type = 'text' 
                    id='password'
                    name='password' 
                    value={this.state.password}
                    onChange = {this.inputHandler}
                 />
                <label htmlFor = 'department'> Department </label>
                <input 
                    type = 'text' 
                    id='department'
                    name='department' 
                    value={this.state.department}
                    onChange = {this.inputHandler}
                 />
                 <button className ='submitButton'>Submit</button>
                </form>
                {this.state.message
                    ?(<h4>{this.state.message}</h4>)
                    : undefined
                }
            </div>
        )
    }
}