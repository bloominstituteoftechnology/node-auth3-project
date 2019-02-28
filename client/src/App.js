import React, { Component } from 'react';
import './App.css';

import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Login from './login/Login';
import Users from './users/Users';
import Register from './register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/register" className="navlink">Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login" className="navlink">Login</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users" className="navlink">Users</NavLink>
            
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <main>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  };
}

export default withRouter(App);
