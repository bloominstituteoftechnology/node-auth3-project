import React, { Component } from 'react';
import axios from 'axios'


class Signin extends Component {
  state = {
    username: '',
    password: ''
  }

  handler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', this.state)
    .then(res => {
      const token = res.data;
      localStorage.setItem('jwt', token);
      this.props.history.push('/users')
    })
    .catch(err => {
      console.log('axios failed')
    })
  }

  render() {
    return (
      <div className='signin'>
        <h1>Please log in...</h1>
        <form onSubmit={this.submitHandler}>
          <input
          name= 'username'
          placeholder='username'
          value= {this.state.username}
          onChange= {this.handler}
          type= 'text'
          />
          <br />
          <input
          name= 'password'
          placeholder='password'
          value= {this.state.password}
          onChange= {this.handler}
          type= 'password'
          />
          <br />
          <button type='submit'>Sign in</button>
        </form>
      </div>
    );
  }
}

export default Signin;
