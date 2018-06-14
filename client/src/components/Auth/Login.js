import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  hanldeInput = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    axios
      .post('http://localhost:5500/api/auth/login', this.state, { headers: { authorization: jwt } })
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
        <input placeholder="username" type="text" id="name" name="username" value={this.state.username} />
        <br />
        <input placeholder="password" type="password" id="password" name="password" value={this.state.password} />
        <br />
        <button type="submit">Sigin</button>
        <br />
        <br />
        <Link to="/register">
          <button>Signup</button>
        </Link>
      </form>
    );
  }
}

export default Login;
