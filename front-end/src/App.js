import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Users from './users/Users'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);