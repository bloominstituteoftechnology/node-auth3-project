import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Signin from './auth/Signin';
import Users from './users/users';
import Signup from './auth/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <button onClick={this.logoutHandler}> Logout </button>
          </div>

        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }

  logoutHandler = event => {
    localStorage.removeItem('jwt');
  }
}

export default App;
