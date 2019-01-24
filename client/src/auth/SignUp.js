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

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const endpoint = 'http://localhost:4000/api/register';
      const res = await axios.post(endpoint, this.state);
      localStorage.setItem('jwt', res.data.token);

      console.log('Second endpoint!');
      const loginEndpoint = 'http://localhost:4000/api/login';
      const loginRes = await axios.post(loginEndpoint, this.state);
      localStorage.setItem('jwt', loginRes.data.token);
    } catch (error) {
      console.log('Error!', error);
    }
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
            {/* <NavLink to="/users" onClick={this.Delay}> */}
            <button type="submit" />
            Sign Up
            {/* </NavLink> */}
          </div>
          <div>Already have an account?</div>
          <NavLink to="/signin">Sign In Here</NavLink>
        </form>
      </div>
    );
  }
}

export default SignUp;
