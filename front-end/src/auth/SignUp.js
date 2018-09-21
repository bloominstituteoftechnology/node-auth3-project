import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    department: ''
  };
  render() {
    return (
      <form onSubmit={this.signup}>
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
          <label>Department</label>
          <input
            name="department"
            value={this.state.department}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div>
            <button onClick={this.signin}>Sign In</button>
        </div>
      </form>
    );
  }
  signup = event => {
    event.preventDefault();
    console.log(this.state);

    axios
      .post('http://localhost:3300/api/register', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token) // put token in localstorage
        // navigate to login
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log(err);
      });
  };

  signin = event => {
    this.props.history.push('/signin');
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default SignUp;
