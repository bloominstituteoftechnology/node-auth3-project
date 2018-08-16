import React, { Component } from 'react';
import SignIn from './components/SignIn';
import Users from './components/Users';
import {Route} from 'react-router-dom';
//import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

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
        <Route path='/signin' component={SignIn} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
