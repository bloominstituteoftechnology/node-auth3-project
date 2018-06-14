import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import './App.css';
import signin from "./auth/signin";
import users from "./auth/users";


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        <Route path="/signin" component={signin}></Route>
        <Route path="/users" component={users}></Route>
      </div>
    );
  }

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.getItem('jwt');

      this.props.hostory.push('/signin')
    }
  }
}

export default withRouter(App);
