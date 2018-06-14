import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import SignIn from './components/signIn';
import Dashboard from './components/dashboard';
import SignUp from './components/signUp';
import NavBar from './components/navBar';
import Users from './components/usersList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <NavBar  />
      <Route exact path="/" component={SignIn} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
