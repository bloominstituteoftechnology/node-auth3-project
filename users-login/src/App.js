import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import {Route} from react-router-dom;
import {Link} from react-router-dom;

import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className = 'home-page-container'>
          <h1 className = 'home-page-header'>Lambda User Login</h1>
          <div className = 'login-input-container'>
            <div className = 'username-field'>
              <h3>Username: </h3>
              <input 
                className = 'username-input'
              
              />
            </div>
            <div className = 'password-container'>
              <h3>Password: </h3>\
              <input
                className = 'password-input'

              />
            </div>
            <
          </div>
            <Route path = '/register' render = {(props) => <SignUp {...props} />} />
            <Route exact path = '/' render = {(props) => <SignIn {...props} />} />
            <Route path = '/users' render = {(props) => <UsersPage {...props} />} />
          </div>
      </div>
    );
  }
}

export default App;
