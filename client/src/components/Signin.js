import React, { Component } from 'react'
import axios from 'axios'

class Signin extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3300/api/login', { 
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        localStorage.setItem('jwt', res.data)
        this.props.history.push('/users')
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        this.setState({
          username: '',
          password: '',
        })
      })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="username" placeholder="username" onChange={this.handleOnChange} value={this.state.username} />
          <input type="password" name="password" placeholder="password" onChange={this.handleOnChange} value={this.state.password} />
          <input type="submit" value="sign in" />
        </form>
      </div>
    )
  }
}

export default Signin