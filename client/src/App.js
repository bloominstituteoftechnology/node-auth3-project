import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Users from './components/Users';
import Login from './components/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={Users} />
          <Route path="/login" exact component={Login} />
        </main>
      </div>
    );
  }
}

export default App;
