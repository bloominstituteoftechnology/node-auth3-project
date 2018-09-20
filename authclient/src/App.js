import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Users from './users/Users';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <button onClick={this.logout}>Logout</button>
        </header>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
      </div>
    );
  }

  logout = event => {
    localStorage.removeItem('jwt');
  }
}

export default App;
