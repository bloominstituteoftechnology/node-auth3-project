import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Users from './users/Users';
import Signup from './auth/Signup';
import Signin from './auth/Signin.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>

        <Route path= "/signin" Component={Signin} />
        <Route path= "/users" Component={Users} />
        <Route path= "/signup" Component={Signup} />

      </div>
    );
  }
}

export default App;
