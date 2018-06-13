import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users'
import {Route, Link} from 'react-router-dom'
import SignUp from './components/SignUp';


class App extends Component {


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authenticating With JWS</h1>
        </header>
        <Route exact path="/auth/users" component={Users}></Route>
        <Route exact path="/auth/register" component={SignUp}></Route>
        <button>Sign Up</button>
        <button>Sign In</button>
      </div>
    );
  }
}

export default App;
