import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Signin from './auth/Signin';
import Users from './users/Users';
import Signup from  './auth/Signup';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <div><br /><br /><br /><br />
            <button onClick={this.logout}>Logout</button>
          </div>
        </header>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />

      </div>
    );
  }

  logout = event => {
    localStorage.removeItem('jwt');
  }

}

export default App;
