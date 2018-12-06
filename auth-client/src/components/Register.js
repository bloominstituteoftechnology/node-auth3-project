import React, { Component } from 'react';

const initialUser = {
  username: '',
  password: '',
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: '',
    }
  }

  submitHandler = () => {}

  render() {
    return (
    <div>
    <form onSubmit={this.submitHandler}>
      <label htmlFor="username">Username</label>
      <input 
        type='text' 
        id='username' 
        name='username' 
        value={this.state.user.username}></input>

      <input 
      type='text' 
      id='password' 
      name='password' 
      value={this.state.user.password}></input>
    </form>

    { this.state.message 
        ? (<h3>{this.state.message}</h3>)
        : undefined
    }
    
    </div>

    );
  }
}