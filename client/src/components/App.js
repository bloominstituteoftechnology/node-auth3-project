import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import Users from './Users'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={Home} />
        <Route path='/signup' render={props => <Signup {...props} />} />
        <Route path='/signin' render={props => <Signin {...props} />} />
        <Route path='/users' render={props => <Users {...props} />} />
      </div>
    )
  }
}

export default App
