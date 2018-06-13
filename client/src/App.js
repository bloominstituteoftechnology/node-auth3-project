import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users'
import {Route, Link} from 'react-router-dom'


class App extends Component {


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authenticating With JWS</h1>
        </header>
        <Route path="/" component={Users}></Route>
      </div>
    );
  }
}

export default App;
