import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import Register from './registration/Register';
import Login from './login/Login';
import Users from './users/Users';

import { Button } from 'reactstrap';

import './App.css';


class App extends Component {
  logout = () => {
    localStorage.removeItem('token');

    this.props.history.push('/login');
  }
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/users'>Users</NavLink>

          <Button onClick={this.logout}>Logout</Button>
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

export default withRouter(App);
