import React, { Component } from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api';

class SignIn extends Component {
  state = { name: '', pass: '' };

  signIn = (e) => {
    const { name, pass } = this.state;
    e.preventDefault();
    axios.post(`${URL}/login`, { name, pass })
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        this.props.history.push('/users');
      })
      .catch(err => console.error(err));
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.signIn}>
        <div>
          <label>Username</label>
          <input 
            value={this.state.name} 
            onChange={this.onChange} 
            name="name" 
            type="text" 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            value={this.state.pass} 
            onChange={this.onChange} 
            name="pass" 
            type="password"
          />
        </div>
        <button>Sign in</button>
      </form>
    );
  }
}

export default SignIn
