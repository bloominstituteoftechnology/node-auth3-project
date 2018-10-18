import React, { Component } from 'react';
import axios from 'axios';

class SignInForm extends Component {
  state = {
    username: '',
    password: '',
  };

  userSignIn = event => {
    event.preventDefault();
  
    console.log(this.state);
    axios
      .post('http://localhost:4000/api/login', this.state)

      .then(response => {
        console.log(response.data);
        localStorage.setItem('jwt', response.data.token);
        })
        
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.userSignIn}>
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
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default SignInForm;