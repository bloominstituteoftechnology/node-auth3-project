import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import Users from '../users/Users';

class Signin extends Component {
  state = {
    username: "",
    password: ""
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange} 
            type='text'
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            name="password" 
            value={this.state.password}
            onChange={this.handleInputChange} 
            type='password'
          />
        </div>
        <div>
        <button type="submit">
          <NavLink to="/users" onClick={this.handleSubmit.bind(this)}>Submit</NavLink>
          </button>
        </div>
        <Route path='/users' component={Users} exact></Route>
      </form>
    );
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name] : target.value });
  }

  handleSubmit = event => {
    const credentials = this.state;
    const endpoint = 'http://localhost:5112/api/login';
    axios.post(endpoint, credentials)
    .then(res => {
      localStorage.setItem('jwt', res.data.token);
      this.props.history.push("/users");
    }).catch(err => {
      console.log('err from login', err);
    });
  }
}

export default Signin;