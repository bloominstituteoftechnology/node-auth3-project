import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Users from './components/Users/Users.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
             <Route path='/login' component={ Login } />
             <Route path='/signup' component={ Register } />
             <Route path='/users' component={ Users } />
        </div>
      </div>
    );
  }
}

export default App;
