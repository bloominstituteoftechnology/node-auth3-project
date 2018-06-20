import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <Route path="/ signin" component={Signin} />
        <p className="App-intro">
          Please implement the required code for the assignment.
        </p>
      </div>
    );
  }
}

export default App;
