import React, { Component } from 'react'

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <div>
        <form>
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
            {/*Role options*/}
          </label>
          <button type="submit"></button>
        </form>
      </div>
    )
  }
}

export default Register;
