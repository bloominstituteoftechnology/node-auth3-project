import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    };
  render() {
    return (
        <form onSubmit={this.signin}>
            <div>
                <label>Username:</label>
                <input name="username" value={this.state.username} onChange={this.handleChange} type="text" />
            </div>
            <div>
                <label>Password:</label>
                <input name="password" value={this.state.password} onChange={this.handleChange} type="password" />
            </div>
            <div>
                <button type="submit">Signin</button>
            </div>
        </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
  }

  signin = event => {
      event.preventDefault();

      axios
        .post('http://localhost:3000/api/login', this.state)
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
        })
        .catch(err => {
            console.err(err);
        });
  };
}

export default SignIn;