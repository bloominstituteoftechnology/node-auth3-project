import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import logo from './logo.png';

import Register from './components/Register.js';
import Login from './components/Login.js';
import Users from './components/Users.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="content-container">
            <img src={logo} />
            <nav className="nav-bar">
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
              <Link to='/users'>Users</Link>
            </nav>
          </div>
        </header>
        <section>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/users' component={Users} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
