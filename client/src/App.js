import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'; 
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage'; 
import UsersPage from './Components/UsersPage'; 


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path = "/signup" component = {SignupPage} />
        <Route path = "/login" component = {LoginPage} />
        <Route path = "/users" component = {UsersPage} />
      </div>
    );
  }
}

export default App;
