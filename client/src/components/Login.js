import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const keyName = process.env.REACT_APP_TOKEN_ITEM;
const initialUser = {
    username: '',
    password: ''
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    inputHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ user: { ...this.state.user, [name]: value}});
    }

    submitHandler = (e) => {
        e.preventDefault();
        axios.post(`${url}/api/login`, this.state.user)
        .then(res => {
            if(res.status === 200) {
                localStorage.setItem(keyName, res.data.token)
                this.setState({mesage: res.data.message, user: { ...initialUser }})
                this.props.history.push('/users')
            } else {
                throw new Error()
            }
        })
        .catch(err => {
            console.log(err)
            this.setState({mesage: 'login failed', user: { ...initialUser }})
        });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={this.state.user.username}
                    onChange={this.inputHandler}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={this.state.user.password}
                    onChange={this.inputHandler}
                />
                <button type="submit">Login</button>
            </form>
        )
    }
}

export default Login;