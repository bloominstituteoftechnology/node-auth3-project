import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    submitHandler = e => {
        e.preventDefault();
        axios
        .post('http://localhost:3300/api/login', this.state)
        .then(res => {
            console.log('response', res)
            const {token} = res.data;
            localStorage.setItem('token', token);
            this.props.history.push('/users');
        })
        .catch(err => {
            console.error('Axios error:', err);
        });
    }

  render() {
    return (
      <div className="SignIn">
        <form onSubmit={this.submitHandler}>
            <input
            value={this.state.username}
            onChange={this.inputChangeHandler}
            type="text"
            placeholder="username"
            name="username"
            />
            <input
            value={this.state.password}
            onChange={this.inputChangeHandler}
            type="password"
            placeholder="password"
            name="password"
            />
            <button type="submit">Signin</button>
        </form>
      </div>
    );
  }

}

export default Login;
