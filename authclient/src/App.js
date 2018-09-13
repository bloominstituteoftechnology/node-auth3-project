import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signin from './auth/Signin';
import Users from './users/Users';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  logout = e => {
    localStorage.removeItem('jwt');
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <div>
            <button onClick={this.logout}>Logout</button>
          </div>
        </header>
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
