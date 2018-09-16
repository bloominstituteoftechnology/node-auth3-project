import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {  Route, withRouter } from "react-router-dom";
import SignUp from './components/signUp';
import Users from './components/users';
import SignIn from './components/signIn';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
