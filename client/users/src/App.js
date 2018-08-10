import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Users from './components/users/Users'
import { withRouter } from 'react-router'
import AuthContainer from './components/auth/AuthContainer'
import styled from 'styled-components'

const Background = styled.div`
  background: black
  height: 100%
`

class App extends Component {
  render() {
    return (
      <Background className="App">
        <Route path='/signin' component={AuthContainer} />
        <Route path='/users' component={Users} />
      </Background>
    );
  }
}

export default withRouter(App);
