import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import registerLoginForm from './components/registerLoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <p className="App-intro">
          Please implement the required code for the assignment.
        </p>
        <Route path="/signin" component={registerLoginForm}/>
        <Route path="/signup" component={registerLoginForm}/> 
        {/* <Route path="/users" component={}/> */}
      </div>
    );
  }
}

export default App;
