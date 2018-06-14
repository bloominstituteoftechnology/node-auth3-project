import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import logo from './logo.svg'
import './App.css'
import Signin from './Signin'
import Users from './Users'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>

          <div>
            {localStorage.getItem('jwt') &&
              <button onClick={this.signout}>Signout</button>}
          </div>
        </header>

        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    )
  }

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt')

      this.props.history.push('/signin')
    }
  }
}

export default withRouter(App)
