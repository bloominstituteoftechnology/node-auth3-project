import React, { Component } from 'react';
import axios from 'axios';

class SignUpView extends Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    return (
      <div>
        <h1>Sign Up New User</h1>
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
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>
        <h3 className="alertMessage">{`${this.state.username} is now a user`}</h3>
      </div>
    );
  }

  signedUpMessage = document.getElementsByClassName('alertMessage');

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:3300/api/register';
    //console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        this.signedUpMessage[0].style.display = 'block';
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  };
}

export default SignUpView;
