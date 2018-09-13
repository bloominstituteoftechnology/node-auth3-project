import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  state = {
    userName: '',
    password: '',
    department: '',
  }
up
  render() {
    return (
      <form onSubmit={this.signin}>
        <div>
          <label>Username</label>
          <input name="userName" value={this.state.username} onChange={this.handleChange} type="text"/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
        </div>
        <div>
          <label>Department</label>
          <input name="department" value={this.state.department} onChange={this.handleChange} type="text"/>
        </div>
        <div>
          <button type="submit">Sign Me In!</button>
        </div>
      </form>
    )
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value});
  };

  signin = event => {
    event.preventDefault();

    axios.post('http://localhost:3300/api/login', this.state).then(result => {
      localStorage.setItem('jwt', result.data.token);
      this.props.history.push('/users');
    }).catch(err => {
      console.error(err);
    })
  };
};

export default SignIn;
