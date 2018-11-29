import React, { Component } from 'react';
import { EventEmitter } from '../events';

class SignUp extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: '',
        password: '',
        department: ''
      };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler = event => {
    event.preventDefault();
    const { username, password, department } = this.state;
    let newUser = { username, password, department }
    EventEmitter.dispatch('signup', newUser);
    this.setState({
      username: '',
      password: '',
      department: ''
    });
  }

  render() {
    return (
      <div>Sign Up
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={this.state.department}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp