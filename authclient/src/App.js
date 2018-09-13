import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';

import './App.css';

import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Users from './components/Users/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="links-container">
            <NavLink to="/signin">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <button onClick={ this.logout }>Logout</button>
          </div>
        </header>

        <Route path="/signup" component={ Signup } />
        <Route path="/signin" component={ Signin } />
        <Route path="/users" component={ Users } />
      </div>
    );
  }

  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  };
}

export default withRouter(App);