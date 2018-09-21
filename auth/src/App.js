import React, { Component } from 'react';
import './App.css';
import SignIn from './auth/SignIn';
import { Route } from 'react-router-dom';
import Users from './users/Users';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={SignIn} />
        <Route pathe="/users" component={Users} />
      </div>
    );
  }
}

export default App;
