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
      <div className = "header-wrap">
        <header className="App-header">
        <div className = "navigation">
          <button onClick = {this.routeToSignin}> Sign in </button>
          <button onClick = {this.routeToRegister}> Register </button>
          <button onClick = {this.logout}> Sign Out </button>
        </div>
          <h1 className="App-title">Client Side Routing Project</h1>
        </header>
        </div>
      
      <div className = "routes"> 
        <Route path = "/register" component = { Register } />
        <Route path = "/signin" component = { Signin } />
        <Route path = "/users" component = { Users } />
      </div>

      </div>
    );
  }
  
  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('./signin');
  };

  routeToSignin = event => {
    this.props.history.push('/signin')
  };

  routeToRegister = event => {
    this.props.history.push('/register')
  };

}



export default withRouter(App);
