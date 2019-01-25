import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';

class Signin extends Component {
  state = {
    username: "",
    password: "",
    department: "",
    SignedUp: false,
  }

  render() {
    const redirectToUsers = this.state.SignedUp;
    if (redirectToUsers === true) {
      return (<Redirect to='/users' />)
    }
    return (
      <div>
        <h3>Create a new user</h3>
        <form onSubmit={this.createUser}>
          <div>
            <label htmlFor="username">Username</label>
            <input 
              name="username" 
              value={this.state.username}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              name="password" 
              value={this.state.password}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input 
              name="department" 
              value={this.state.department}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>
          <div>
            <Button color='info' type='submit'>Sign In</Button>
          </div>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name] : target.value})
  }

  createUser = event => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department,
    }
    const endpoint = 'http://localhost:1234/api/register';
    axios.post(endpoint, credentials)
    .then(res => {
      console.log('response data from login', res.data);
      localStorage.setItem('jwt', res.data.token);
      this.setState({ SignedUp: true });
    })
    .catch(err => {
      console.log('response from login', err);
      this.setState({ username: '', password: '', department: '' });
    });
    // console.log(this.state);
  }
}

export default Signin;