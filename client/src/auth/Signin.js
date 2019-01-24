import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = {
    username: 'Nick',
    password: 'Test'
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:4000/api/login';
    // const endpoint = `${process.env.REACT_APP_API_URL}/login`;
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
      })
      .catch(err => console.log('Error!', err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
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
            <button type="submit" />
            Sign In
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
