import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <Route path = "/signin" component = {Signin}> </Route>
        <Route path = "/users" component = {Users}> </Route>
      </div>
    );
  }
}

export default App;
