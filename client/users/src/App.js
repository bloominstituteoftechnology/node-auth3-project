import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Signin from './components/auth/Signin'
import Users from './components/users/Users'
import { withRouter } from 'react-router'
import Signup from './components/signup/Signup'
import styled from 'styled-components'

const SplitScreen = styled.div`
  
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
