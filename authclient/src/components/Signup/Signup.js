import React, { Component } from 'react';
import axios from 'axios';

import '../login_signup_containers.css';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    department: '',
  };

  render() {
    return (
      <form className="signup-container" onSubmit={this.register}>
        <div className="new-container">
          <div className="input-container">
            <label>Username:</label>
            <input
              className="custom-input"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              className="custom-input"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div className="input-container">
            <label>Department:</label>
            <input
              className="custom-input"
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div className="button-container">
            <button type="submit">SIGN UP</button>
          </div>
        </div>
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  register = event => {
    event.preventDefault();

    axios
        .post('http://localhost:3500/api/register', this.state)
        .then(res => {
            console.log('Axios response', res);
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/users');
        })
        .catch(err => {
            console.error('Axios respose:', err)
        })
  };
}

export default Signup;