import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      department: ''      
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(this)
    console.log('submit')

    axios.post('http://localhost:3300/api/register', { 
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      })
      .then((res) => {
        localStorage.setItem('jwt', res.data)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({
          username: '',
          password: '',
          department: ''
        })
      })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="username" placeholder="username" onChange={this.handleOnChange} value={this.state.username} />
          <input type="password" name="password" placeholder="password" onChange={this.handleOnChange} value={this.state.password} />
          <input type="text" name="department" placeholder="department" onChange={this.handleOnChange} value={this.state.department} />
          <input type="submit" value="sign up" />
        </form>
      </div>
    )
  }
}

export default Signup