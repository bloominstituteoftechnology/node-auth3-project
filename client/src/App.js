import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Users from './components//Users';

axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home/Root</h1>
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
