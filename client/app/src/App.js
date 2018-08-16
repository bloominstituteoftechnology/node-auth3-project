import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Signin from './auth/Signin.js';
import Signup from './auth/Signup.js';
import Users from './auth/Users.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
