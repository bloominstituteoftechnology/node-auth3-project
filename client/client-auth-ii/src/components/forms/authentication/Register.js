import React, { Component } from 'react'
import { connect } from 'react-redux';

import { registerFetching } from '../../../store/actions';

import logo from '../../../logo.svg';


class Register extends Component {
  state = {
    username: '',
    password: '',
    selectedRole: ''
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  submitRegister = e => {
    e.preventDefault();
    const userCreds = {
      username: this.state.username,
      password: this.state.password,
      roleId: this.state.selectedRole
    }
    this.props.registerFetching(userCreds);
    this.setState({username: '', password: '', selectedRole: ''})
    // route to login
  }

  render() {
    console.log('reg', this.props.roles)
    return (
      <div>
        {this.props.roles.length === 0 ?
          <img src={logo} className="App-logo" alt="logo" />
          :
          <form onSubmit={this.submitRegister}>
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
            <label htmlFor="roleOptions">
              <select 
                name="selectedRole"
                value={this.state.selectedRole}
                onChange={this.handleChange}
              >
                {this.props.roles.map((role, index) => {
                    return (
                      <option key={index} value={role.roleId}>{role.role_name}</option>
                    )
                  })
                }
              </select>
            </label>
            <button type="submit">Register</button>
          </form>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

  registerFetching: userCreds => {
    dispatch(registerFetching(userCreds));
  }
});

export default connect(null, mapDispatchToProps)(Register);
