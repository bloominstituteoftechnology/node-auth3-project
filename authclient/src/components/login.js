import React, { Component } from 'react';
import axios from 'axios';
import Auth from './auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.auth = new Auth();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9000/api/login',
        this.state
      );
      console.log(response);
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    } catch (err) {
      alert(err);
    }
  };

  logout = event => {
    event.preventDefault();
    this.props.history.push('/');
    localStorage.removeItem('token');
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {localStorage.getItem('token') ? (
            <h1>Already logged in</h1>
          ) : (
            <React.Fragment>
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.username}
                name="username"
              />
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.password}
                name="password"
              />
              <button type="submit">LOGIN!!</button>
            </React.Fragment>
          )}
          <button onClick={this.logout}>logout</button>
        </form>
      </div>
    );
  }
}

export default Login;
