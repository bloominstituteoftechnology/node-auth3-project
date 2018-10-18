import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    department: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/login', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log(err);
        alert('Incorrect username or password.');
      });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            Username
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <Link to="/register">Sign Up</Link>
      </div>
    );
  }
}

export default Login;
