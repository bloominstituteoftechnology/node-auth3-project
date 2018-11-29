import React from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: ''
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: { ...initialUser },
            message: ''
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;

        this.setState({
            user: { ...this.state.user, [name]: value }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/login`, this.state.user)
            .then(res => {
                if (res.status === 200 && res.data) {
                    localStorage.setItem('unimportant', res.data.token);
                    this.props.history.push('/');
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Failed to login'
                })
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        placeholder="Username"
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        placeholder="Password"
                        onChange={this.inputHandler}
                    />
                    <button type="submit">Submit</button>
                </form>
                {this.state.message ? <h4>{this.state.message}</h4> : null}
            </div>
        )
    }
}

export default Login;