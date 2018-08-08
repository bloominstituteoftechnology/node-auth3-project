import React, { Component } from 'react'
import axios from 'axios'

const Authentication = (App) =>
  class extends Component {
    constructor () {
      super()
      this.state = {
        username: '',
        password: '',
        department: ''
      }
    }

    handleSubmitLogIn = (e) => {
      e.preventDefault()
      console.log('METHOD')
      const { username, password, department } = this.state
      axios
        .post('http://localhost:8000/api/register', {
          username,
          password,
          department
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          this.setState({ username: '', password: '', department: '' })
        })
        .catch((err) => console.log(err))
    }

    logInput = ({ target }) => {
      const { name, value } = target

      this.setState({
        [name]: value
      })
    }

    render () {
      console.log('in here')
      if (
        localStorage.getItem('username') &&
        localStorage.getItem('password')
      ) {
        return <App />
      } else {
        return (
          <form type='submit' onSubmit={this.handleSubmitLogIn}>
            <input
              placeholder='sername'
              type='text'
              name='username'
              onChange={this.logInput}
              value={this.state.username}
              className='comment-input'
              required
            />
            <input
              placeholder='Password'
              type='password'
              name='password'
              onChange={this.logInput}
              value={this.state.password}
              className='comment-input'
              required
            />
            <input
              placeholder='Department'
              type='input'
              name='department'
              onChange={this.logInput}
              value={this.state.department}
              className='comment-input'
              required
            />
            <button type='submit'>Sign up</button>
          </form>
        )
      }
    }
  }

export default Authentication
