import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Signin from './auth/Signin';
import Register from './auth/Register';
import Users from './auth/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
