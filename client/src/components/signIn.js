import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <form onSubmit={this.signin}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
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
        .post('http://localhost:3900/api/login', this.state)
        .then(res => {
            console.log('data', res.data);
            localStorage.setItem('jwt', res.data.token);
            // navigate to /users
            this.props.history.push('/users');
        })
        .catch(err => {
            console.error('Axios Failed', err ); // res.response.data
        });
    console.log('state', this.state);
  };
}

export default SignIn;