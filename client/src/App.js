import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Users from './components/Users';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route path='/' component={Nav} />
        <Route path='/users' component={Users} />
        <Route path='/login' component={SignIn} />
        <Route path='/register' component={SignUp} />
      </div>
    );
  }
}

export default App;
