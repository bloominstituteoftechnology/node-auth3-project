import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Users from './components/Users/Users.js';
import HomePage from './components/HomePage/HomePage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Lambda's Auth-II Project</h1>
        </header>
        <div className="App-intro">
        {localStorage.getItem('jwt') && (
        <button onClick={this.logoutHandler}>Log Out</button>)}
            <Route exact path='/' component={HomePage} />
             <Route path='/login' component={ Login } />
             <Route path='/register' component={ Register } />
             <Route path='/users' component={ Users } />
        </div>
      </div>
    );
  }
    logoutHandler = event => {
      localStorage.removeItem('jwt');

      this.props.history.push('/login');
    };
}

export default withRouter(App);
