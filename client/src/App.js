import React, { Component } from 'react';
import './App.css';

import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Login from './login/Login';
import Users from './users/Users';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/users">Users</NavLink>
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <main>
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  };
}

export default withRouter(App);
