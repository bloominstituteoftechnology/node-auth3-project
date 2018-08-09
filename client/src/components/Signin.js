import React, { Component } from 'react';
import axios from 'axios';


class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  handleChange = (e) => {this.setState({ [e.target.name]: e.target.value });}
  handleSignin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/login', this.state)
      .then(response => {
        console.log('SIGNIN RESPONSE: ', response.data)
        localStorage.setItem('jwt', response.data);
      })
      .catch(err => {console.log('Axios failed.', err)})
    this.setState({ username: '', password: '' })
  }
  render() {
    return (
      <div>
        <form>
          <input name='username' value={this.state.username} placeholder='Username...' onChange={this.handleChange} />
          <input name='password' type='password' value={this.state.password} placeholder='Password...' onChange={this.handleChange} />
          <button onClick={this.handleSignin}>Login</button>
        </form>
      </div>
    );
  }
}

export default Signin;