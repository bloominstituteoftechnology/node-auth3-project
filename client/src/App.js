import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './auth/Login';
import Users from './users/Users';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          We are on. 
        </p>
        <div>
          <button onClick = {this.logoutHandler}>Logout</button>
        </div>
        <Route path = "/login" component= {Login}></ Route>
        <Route path = "/users" component= {Users}></ Route>
      </div>
    );
  }
  
  logoutHandler = e => {
    localStorage.removeItem('jwt');
  }
}

export default App;
