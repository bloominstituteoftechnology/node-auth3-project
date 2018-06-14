import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      race: '',
    };
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.hanldeInput}>
        <input placeholder="username" type="text" id="name" name="username" value={this.state.username} />
        <br />
        <input placeholder="race" type="text" id="race" name="race" value={this.state.race} />
        <br />
        <input placeholder="password" type="password" id="password" name="password" value={this.state.password} />
        <br />
        <button type="submit">Sigin</button>
        <br />
        <br />
        <Link to="/login">
          <button>Login</button>
        </Link>
      </form>
    );
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
}

export default Register;
