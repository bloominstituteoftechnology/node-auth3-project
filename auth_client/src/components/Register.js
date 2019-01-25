import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const credentials = this.state;
    const endpoint = 'http://localhost:8080/api/register';
    axios.post(endpoint, credentials)
    .then(res => {
      localStorage.setItem('jwt'. res.data.token);
    })
    .catch(err => {
      console.log('error', err);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            name='username'
            value={this.state.username}
            onChange={this.handleInputChange}
            type='text'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            value={this.state.password}
            onChange={this.handleInputChange}
            type='text'
          />
        </div>
        <div>
          <button type='submit'>Register</button>
        </div>
      </form>
    );
  }
}

export default Register;
