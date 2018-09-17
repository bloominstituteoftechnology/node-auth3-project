import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Signout from './components/Signout'
import Users from './components/Users'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
        <Route path="/users" component={Signout} />
      </div>
    );
  }
}

export default App