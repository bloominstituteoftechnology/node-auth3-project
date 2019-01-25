import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    isSignedIn: false
  };
  render() {
    if (this.state.isSignedIn) {
      return <Redirect to="/users" />;
    }
    return (
      <div>
        <h2>Please Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
  handleInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(user);
    axios
      .post('http://localhost:5500/api/login', user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        this.setState({ username: '', password: '', isSignedIn: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default SignIn;
