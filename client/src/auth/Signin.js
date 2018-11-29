import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    return (
      <div className='form'>
        <form onSubmit={this.handleSubmit}>
          <div className='form__input'>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>
          <div className='form__input'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
              type='password'
            />
          </div>
          <div className='form__btn'>
            <button type='submit'>Sign In</button>
          </div>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:8000/api/login';
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log('big time error bruh', err);
      });
  };
}

export default Signin;
