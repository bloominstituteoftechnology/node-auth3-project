import React, { Component } from 'react'
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
    axios.get('http://localhost:8000/api/restricted').then((users) => {
      this.setState({ users: users })
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>

        <p className='App-intro'>{this.state.users}</p>
      </div>
    )
  }
}

export default Authentication(App)
