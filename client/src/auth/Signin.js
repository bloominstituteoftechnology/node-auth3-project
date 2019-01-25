import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router'

class Signin extends Component {
  state = {
    username: "",
    password: "",
    isAuthenticated: false
  }
  validateForm(){
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  render() {
    if (this.state.isAuthenticated === true){
      return <Redirect to ='/users'/>
    }
    return (
      <form onSubmit={this.handleSubmit}>
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
          <button type='submit' disabled={!this.validateForm()}>Sign In</button>
        </div>
      </form>
    );
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name] : target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const credentials = this.state;
    const endpoint = 'http://localhost:3300/api/login';
    axios.post(endpoint, credentials)
    .then(res => {
      console.log('reponse data from login', res.data);
      localStorage.setItem('jwt', res.data.token);
      if (res.data.token){
        this.setState({isAuthenticated: true}
        )};
      this.props.login();
    }).catch(err => {
      console.log('err from login', err);
    });
  }
}

export default Signin;