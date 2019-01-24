import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import SignUp from './components/SingUp';
import UserList from './components/UserList';
import LogIn from './components/LogIn';

class App extends Component {
  render() {
    return (
      <>
        <NavLink activeClassName='active' to='/signup'>
          Sign Up
        </NavLink>
        <NavLink activeClassName='active' to='/signin'>
          Log In
        </NavLink>
        <NavLink activeClassName='active' to='/users'>
          Users
        </NavLink>
        <Route path='/signup' component={SignUp} />
        <Route path='/users' component={UserList} />
        <Route path='/signin' component={LogIn} />
      </>
    );
  }
}

export default App;
