import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import signin from "./auth/signin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <Route path="/signin" component={signin}></Route>
      </div>
    );
  }
}

export default App;
