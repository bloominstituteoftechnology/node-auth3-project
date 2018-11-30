import React, { Component } from 'react';
import axios from 'axios';
import { StyledForm } from '../styles/StyledForm';

const initalUser = {
  username: '',
  password: '',
  department: ''
};

const url = process.env.REACT_APP_API_URL;

class Register extends Component {
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
      .post(`${url}/api/register`, this.state.user)
      .then(res => {
        if (res.status === 201) {
          this.setState({
            message: 'Register Successful',
            user: { ...initalUser }
          });
          this.props.history.push('/login');
        }
      })
      .catch(err => {
        this.setState({
          message: err.response.data.message,
          user: { ...initalUser }
        });
      });
  };

  render() {
    const { username, password, department } = this.state.user;
    return (
      <div>
        <StyledForm onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
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
          <input
            type="text"
            name="department"
            value={department}
            placeholder="Enter your department..."
            onChange={this.handleInputChange}
          />
          <button type="submit">Sign Up</button>
          {this.state.message ? <div>{this.state.message}</div> : null}
        </StyledForm>
      </div>
    );
  }
}

export default Register;
