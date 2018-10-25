import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const endpoint = 'http://localhost:5000/api/login';

    axios
      .post(endpoint)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error('ERROR', err);
      })
  }
}

export default Login;