import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Register from './Register'
import Login from './Login'

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

    handleRegister = (e) => {
      e.preventDefault()
      console.log('METHOD')
      const { username, password, department } = this.state
      console.log(department)
      axios
        .post('http://localhost:8000/api/register', {
          username,
          password,
          department
        })
        .then((response) => {
          localStorage.setItem('token', JSON.stringify(response.data.token))
          this.setState({ username: '', password: '', department: '' })
        })
        .catch((err) => console.log(err))
    }

    handleLogin = (e) => {
      e.preventDefault()
      console.log('login')
      const { username, password } = this.state
      console.log(username)
      axios
        .post('http://localhost:8000/api/login', { username, password })
        .then((res) => {
          console.log(res)
          localStorage.setItem('token', JSON.stringify(res.data.token))
          this.setState({ username: '', password: '' })
        })
        .catch((err) => console.log(err))
    }

    logInput = ({ target }) => {
      console.log('in here')
      const { name, value } = target

      this.setState({
        [name]: value
      })
    }

    render () {
      if (localStorage.getItem('token')) {
        return <App />
      } else {
        return (
          <div>
            {/* <Login
              username={this.state.username}
              password={this.state.password}
              logInput={this.logInput}
              handleLogin={this.handleLogin}
            /> */}
            <Route
              exact
              path='/'
              render={(props) => (
                <Login
                  {...props}
                  username={this.state.username}
                  password={this.state.password}
                  logInput={this.logInput}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            <Route
              path='/api/register'
              render={(props) => (
                <Register
                  username={this.state.username}
                  password={this.state.password}
                  department={this.state.department}
                  handleRegister={this.handleRegister}
                  logInput={this.logInput}
                />
              )}
            />
          </div>
        )
      }
    }
  }

export default Authentication
