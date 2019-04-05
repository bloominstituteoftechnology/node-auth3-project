import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Login from './components/login.js';
import Users from './components/users.js';

class App extends Component {
  logout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>

        <main>
          <Route path='/login' component={Login} />
          <Route path='/users' component={Users} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
