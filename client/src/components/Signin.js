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
        localStorage.setItem('jwt', response.data);
        this.props.history.push('/users');
      })
      .catch(err => {console.log('Axios failed.', err)})
    this.setState({ username: '', password: '' })
  }
  render() {
    return (
      <div className='signin'>
        <form className='form'>
          <h1 className='form-header'>Sign in below:</h1>
          <input name='username' value={this.state.username} placeholder='Username...' onChange={this.handleChange} />
          <input name='password' type='password' value={this.state.password} placeholder='Password...' onChange={this.handleChange} />
          <div className='btn' onClick={this.handleSignin}>Login</div>
        </form>
      </div>
    );
  }
}

export default Signin;