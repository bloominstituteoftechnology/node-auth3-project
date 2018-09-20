import React, { Component } from 'react';
import './App.css';
import SignIn from './auth/SignIn';
import { Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={SignIn} />
      </div>
    );
  }
}

export default App;
