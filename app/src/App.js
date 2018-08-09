import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import signup from './components/signup.js';
import Signin from './components/signin.js';
import Users from './components/users.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signup' component={signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
