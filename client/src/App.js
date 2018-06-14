import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import './App.css';
import Signin from './signin.js';
import Users from './users.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        

      <Route path="/signin" component={Signin} />
      <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
