import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    roles: '',
    password: ''
  };

  render() {
    return (
      <div className='form'>
        <form onSubmit={this.handleSubmit}>
          <div className='form__input'>
            <input
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
              type='text'
              placeholder='Username'
              className='form__input'
            />
          </div>
          <div className='form__input'>
            <input
              name='roles'
              value={this.state.roles}
              onChange={this.handleInputChange}
              type='text'
              placeholder='Roles'
              className='form__input'
            />
          </div>
          <div className='form__input'>
            <input
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
              type='password'
              placeholder='Password'
              className='form__input'
            />
          </div>
          <div>
            <button type='submit' className='form__btn'>
              Sign Up
            </button>
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
    const endpoint = 'http://localhost:8000/api/register';

    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        // localStorage.setItem('jwt', res.data.token);
      })
      .catch(err => {
        console.log('big time error bruh', err);
      });
  };
}

export default SignUp;
