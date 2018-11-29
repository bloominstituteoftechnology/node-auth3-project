import React, { Component } from 'react';
import axios from 'axios';
import { StyledForm } from '../styles/StyledForm';

const initalUser = {
  username: '',
  password: ''
};

const url = process.env.REACT_APP_API_URL;

class Login extends Component {
  state = {
    user: { ...initalUser },
    message: ''
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${url}/api/login`, this.state.user)
      .then(res => {
        // console.log(res);
        if (res.status === 200 && res.data) {
          localStorage.setItem('auth_token', res.data.token);
          this.setState({
            user: { ...initalUser }
          });
          this.props.history.push('/');
        }
      })
      .catch(err => {
        this.setState({
          message: 'Login failed',
          user: { ...initalUser }
        });
      });
  };

  render() {
    const { username, password } = this.state.user;
    return (
      <div>
        <StyledForm onSubmit={this.handleSubmit}>
          <h3>Log in</h3>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter a username..."
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter a password..."
            onChange={this.handleInputChange}
          />
          <button type="submit">Log In</button>
          {this.state.message ? <div>{this.state.message}</div> : null}
        </StyledForm>
      </div>
    );
  }
}

export default Login;
