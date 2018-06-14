import React, { Component } from 'react';
import { Route } from 'react-router';

import Form from './components/misc/Form/Form';
import Users from './components/Users/Users';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>

        <Route path='/register' component={ Form } />
        <Route path='/users' component={ Users } />
        <Route path='/user/:id' component={ Users } />
                
      </div>
    );
  }
}

export default App;
