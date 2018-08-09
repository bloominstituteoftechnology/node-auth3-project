import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const URL = 'http://localhost:8000/api/login';
    const login = { ...this.state };
    axios
      .post(URL, login)
      .then(response => {
        const token = response.data;
        localStorage.setItem('token', token);
        window.location.pathname = '/users';
      })
      .catch(err => console.log(err))
  }

  render() {
    return(
      <Fragment>
        <div className='login'>
          <form>
            <label>
              Username:
              <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
            </label>
            <label>
              Password:
              <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
            </label>
            <button type='submit' onClick={this.handleSubmit}>
              Login
            </button>
          </form>
        </div>
        <div className='not-registered'>
          <p>Not Registered?</p>
          <Link to='/register'>
            Register
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default Login;