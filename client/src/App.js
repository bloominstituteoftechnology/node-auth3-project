import React, { Component } from 'react';
import {  Route, withRouter } from "react-router-dom";

import './App.css';

import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Users from './components/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <div>
            <button onClick={this.logout} >Logout</button>
          </div>
        </header>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  };
}

export default withRouter(App);
