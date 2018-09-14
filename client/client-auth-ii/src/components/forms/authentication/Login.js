import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loginFetching } from '../../../store/actions';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  submitLogin = e => {
    e.preventDefault();
    const userCreds = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginFetching(userCreds);
    this.setState({username: '', password: ''})
    // route to profile page
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitLogin}>
          <label htmlFor="username">
            <input
              id="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

  loginFetching: userCreds => {
    dispatch(loginFetching(userCreds));
  }
});

export default connect(null, mapDispatchToProps)(Login);
