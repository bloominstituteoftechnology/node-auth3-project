import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInput = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const endpoint = 'http://localhost:8000/api/login';
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      })
      .catch((err) => {
        console.error('ERROR', err);
      });
  };

  render() {
    // console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }
}

export default Signin;
