import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Users from './components/users';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav>
        <NavLink to='/' exact>Home</NavLink>&nbsp;|&nbsp;
        <NavLink to='/register' exact>Register</NavLink>&nbsp;|&nbsp;
        <NavLink to='/login' exact>Login</NavLink>&nbsp;|&nbsp;
        <NavLink to='/users' exact>Users</NavLink>
      </nav>
        
        <Route path='/' exact component={Home} />
        <Route path='/register' exact component={Register} />
        <Route path='/login' exact component={Login} />
        <Route path='/users' exact component={Users} />
      </div>
    );
  }
}

export default App;
