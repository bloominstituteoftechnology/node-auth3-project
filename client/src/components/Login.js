import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // the login endpoint wants a user object {username, password}
    axios
      .post('http://localhost:3000/api/login', this.state)
      .then(res => {
        // we're sent a JWT token
        const token = res.data;
        // stash it for later use
        localStorage.setItem('jwt', token);
      })
      .catch(err => {
        console.error('axios err:', err);
      });
    this.setState({ username: '', password: '' });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Username:
          <input
            type="text"
            name="username"
            onChange={this.handleInput}
            placeholder="username"
            value={this.state.username}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
            onChange={this.handleInput}
            placeholder="password"
            value={this.state.password}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
