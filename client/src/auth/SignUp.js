import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route } from 'react-router-dom';

class SignUp extends Component {
  state = {
    username: 'Davo',
    password: 'Test',
    department: 'admin'
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:4000/api/register';
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log('handleSubmit from Sign-up', res.data);
        localStorage.setItem('jwt', res.data.token);
      })
      .catch(err => console.log('Error!', err));

    const loginEndpoint = 'http://localhost:4000/api/login';
    console.log('from second endpoint!');
    axios
      .post(loginEndpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
      })
      .catch(err => console.log('Error!', err));
  };

  Delay = e => {
    e.preventDefault();
    setTimeout(() => {
      this.props.history.push('/users');
    }, 500);
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
            <label htmlFor="department">Department</label>
            <input
              name="department"
              value={this.state.department}
              onChange={this.handleInputChange}
              type="department"
            />
          </div>
          <div>
            <NavLink to="/users" onClick={this.Delay}>
              <button type="submit" />
              Sign Up
            </NavLink>
          </div>
          <div>Already have an account?</div>
          <NavLink to="/signin">Sign In Here</NavLink>
        </form>
      </div>
    );
  }
}

export default SignUp;
