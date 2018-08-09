import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: ''
    }
  }
  handleChange = (e) => {this.setState({ [e.target.name]: e.target.value });}
  handleSignup = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/register', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data);
        this.props.history.push('/users');
      })
      .catch(err => {console.log('Axios failed.', err)})
    this.setState({ username: '', password: '', department: '' })
  }
  render() {
    return (
      <div className='signup'>
        <form className='form'>
          <h1 className='form-header'>Create a new user below:</h1>
          <input name='username' value={this.state.username} placeholder='Username...' onChange={this.handleChange} />
          <input name='password' type='password' value={this.state.password} placeholder='Password...' onChange={this.handleChange} />
          <input name='department' value={this.state.department} placeholder='Department...' onChange={this.handleChange} />
          <div className='btn' onClick={this.handleSignup}>Sign Up</div>
        </form>
      </div>
    );
  }
}

export default Signup;