import React, { Component } from 'react';
import axios from 'axios';

import '../login_signup_containers.css';

class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <form className="signup-container" onSubmit={this.signin}>
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
          <div className="button-container">
            <button type="submit">LOG IN</button>
          </div>        
        </div>

      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  signin = event => {
    event.preventDefault();

    axios
        .post('http://localhost:3500/api/login', this.state)
        .then(res => {
            console.log('Axios response', res);
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/users');
        })
        .catch(err => {
            this.props.history.push('/signin');
            console.error('Axios response:', err);
            
        })
  };
}

export default Signin;