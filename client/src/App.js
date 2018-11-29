import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
