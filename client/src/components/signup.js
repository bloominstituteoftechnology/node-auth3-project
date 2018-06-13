import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {

  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          race: ''
      };
  }  

  handleChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  }  

  render() {
    return (
      <div>
        <form>
            <h1>Sign Up for... </h1>
            <h2>Username:</h2>
            <input name="username" onChange={this.handleChange} value={this.state.username} /> 
            <h2>Password:</h2>
            <input name="password" onChange={this.handleChange} value={this.state.password} />
            <h2>Race:</h2>
             <input name="race" onChange={this.handleChange} value={this.state.race} />
        </form>
      </div>
    )
  }
}
