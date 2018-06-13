import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  signIn = event => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };
    const config = {
      headers: {
        'Authorization': localStorage.authiiToken
      }
    };
    axios.post('http://localhost:5500/api/auth/login', credentials, config)
      .then(response => {
        localStorage.setItem('authiiToken', response.data.token);
        this.props.history.push('/users');
      })
      .catch(error => {
        // TO DO: Show error to user
        console.log('Could not log in', error);
      });
  }
  render() { 
    return (
      <div>
        <h1>Sign In</h1>
        <form>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={this.state.username}
            onChange={this.handleOnChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
          <button onClick={this.signIn}>Sign In</button>
        </form>
      </div>
    )
  }
}
 
export default SignIn;