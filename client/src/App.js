import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Register from './registration/Register';
import Login from './login/Login';
import Users from './users/Users';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </nav>

        <main>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/users' component={Users} />
        </main>
      </div>
    );
  }
}

export default App;
