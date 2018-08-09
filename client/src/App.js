import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Authentication from './Auth/Auth'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }
  }
  componentDidMount () {
    const token = localStorage.getItem('token')
    console.log('in here mount', token)
    axios
      .get('http://localhost:8000/api/restricted', token)
      .then((users) => {
        this.setState({ users: users })
      })
      .catch((err) => console.log(err))
  }

  logout = (e) => {
    localStorage.removeItem('token')
    this.render()
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>

        <p className='App-intro'>
          {this.state.users.map((user) => {
            console.log(user)
            return (
              <ul>
                <li>{user.username}</li>
              </ul>
            )
          })}
        </p>
        <Link className='logout' to='/' onClick={this.logout}>
          Log out
        </Link>
      </div>
    )
  }
}

export default Authentication(App)
