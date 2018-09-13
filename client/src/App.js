import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Register from './Register';
import Signin from './Signin';
import Users from './Users';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <div>
            <button onClick = {this.logout}> Sign Out </button>
          </div>
        </header>
      
        <Route path = "/register" component = { Register } />
        <Route path = "/signin" component = { Signin } />
        <Route path = "/users" component = { Users } />

      </div>
    );
  }
  
  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('./signin');
  };
}

export default withRouter(App);
