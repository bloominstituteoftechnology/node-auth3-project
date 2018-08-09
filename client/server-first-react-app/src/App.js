import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
//import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="my-app">          
          <h1>Hey-Hey-Hey-Hey!</h1>
        </div>

      </div>
    );
  }
}

export default App;
