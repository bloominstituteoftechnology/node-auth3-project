import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    department: '',
    password: '',
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
            type="department"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:3300/api/register';
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        this.setState({ 
            username: '',
            password: '',
            department: '',
        })
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  };
}

export default SignUp;
