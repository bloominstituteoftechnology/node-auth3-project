import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }
  render() {
    return (
      <form onSubmit={this.signin}>
        <div>
          <label>Username</label>
          <input 
            name='username'
            value={this.state.username} 
            onChange={this.handleChange} 
            type="text" 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            name='password'
            value={this.state.password} 
            onChange={this.handleChange} 
            type="password" 
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
        <div>
            <button onClick={this.signup}>Sign Up</button>
        </div>
      </form>
    );
  }
  signin = event => {
    event.preventDefault();
    console.log(this.state);

    axios
        .post('http://localhost:3300/api/login', this.state)
        .then(res => {
            localStorage.setItem('jwt', res.data.token) // put token in localstorage
            // navigate to users
            this.props.history.push('/users');
        })
        .catch(err => {
            console.log(err);
        })   
  };

  signup = event => {
    this.props.history.push('/signup');
  }
  handleChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value});
  }
}

export default SignIn;
