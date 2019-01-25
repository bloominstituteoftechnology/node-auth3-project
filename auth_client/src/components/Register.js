import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    password: '',
    department: '',
    isRegistered: false
  };

  render() {
    if (this.state.isRegistered) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        <h2>Please provide username and password</h2>
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
          <input
            type="text"
            name="department"
            placeholder="department"
            value={this.state.department}
            onChange={this.handleInput}
          />
          <br />
          <button>Register</button>
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
      password: this.state.password,
      department: this.state.department
    };
    console.log(user);
    axios
      .post('http://localhost:5500/api/register', user)
      .then(res => {
        console.log(res.data);
        this.setState({ username: '', password: '', isRegistered: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Register;
