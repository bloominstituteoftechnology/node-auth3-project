import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = {
    username: "",
    password: ""
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="form-username">
          <label htmlfor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlfor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <button type='submit'>Sign In</button>
        </div>

      </form>
    );
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name] : e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const creds = this.state;
    const endpoint = 'http://localhost:3300/api/login';
    axios.post(endpoint, creds)
      .then(res => {
        console.log('response data: ', res.data);
        localStorage.setItem('jwt', res.data.token)
      })
      .catch(err => {
        console.log('Error from Login', err)
      })
  }
}

export default Signin;