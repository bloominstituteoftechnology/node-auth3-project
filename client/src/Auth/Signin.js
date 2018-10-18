import React, { Component } from 'react'
import axios from 'axios'

class Signin extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const endpoint = 'http://localhost:9000/api/login'
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users')
      })
      .catch(err => console.log(err))
  } 

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    )
  }
}

export default Signin
