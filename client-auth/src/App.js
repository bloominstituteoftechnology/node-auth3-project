import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import SignUp from './components/SingUp';
import UserList from './components/UserList';
import LogIn from './components/LogIn';

class App extends Component {
  render() {
    return (
      <>
        <div>
          <NavLink activeClassName='active' to='/signup'>
            Sign Up
          </NavLink>
          <NavLink activeClassName='active' to='/signin'>
            Log In
          </NavLink>
          <NavLink activeClassName='active' to='/users'>
            Users
          </NavLink>
        </div>

        <Route path='/signup' render={props => <SignUp {...props} />} />
        <Route path='/users' render={props => <UserList {...props} />} />
        <Route path='/signin' render={props => <LogIn {...props} />} />
      </>
    );
  }
}

export default App;
