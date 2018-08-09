import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin';
import Users from './components/Users';
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Your Server</h1>
        </header>
        <div>
          {localStorage.getItem('jwt') && (<button onClick={this.logoutHandler}>Logout</button>)}
        </div>
        <Route path="/api/register" component={ Signup }></Route>
        <Route path="/api/signin" component={ Signin }></Route>
        <Route path="/api/users" component={ Users }></Route>
      </div>
    );
  }

  logoutHandler = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/api/signin');
  }
}

export default withRouter(App);
