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
    const key = JSON.parse(token)
    const requestOptions = {
      headers: {
        authorization: key
      }
    }
    console.log(key)
    axios
      .get('http://localhost:8000/api/restricted', requestOptions)
      .then((users) => {
        console.log(users)
        this.setState({ users: users.data })
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

        <div className='App-intro'>
          {this.state.users.map((user) => {
            console.log(user)
            return <li key={user}>{user}</li>
          })}
        </div>
        <Link className='logout' to='/' onClick={this.logout}>
          Log out
        </Link>
      </div>
    )
  }
}

export default Authentication(App)
