import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      race: '',
    };
  }

  hanldeInput = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5500/api/auth/register', this.state)
      .then(response => {
        console.log('response.data', response.data);
        localStorage.setItem('jwt', response.data.jwt);
        this.props.history.push('/users');
      })
      .catch(e => {
        console.log('error', e.message);
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.hanldeInput}>
        <label htmlFor="name">Username</label>
        <input type="text" id="name" name="username" value={this.state.username} />
        <br />
        <label htmlFor="race">Race</label>
        <input type="text" id="race" name="race" value={this.state.race} />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={this.state.password} />
        <br />
        <button type="submit">Sigin</button>
      </form>
    );
  }
}

export default Register;
