import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Users from './components/users';
import Login from './components/login';
import './App.css';
import Auth0 from './Auth0';

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Link to="/users">Users</Link>
        <Link to="/login">Login</Link>
        <Route path="/users" exact component={Users} />
        <Route path="/login" exact component={Login} />
      </div>
    );
  }
}

export default Auth0(App);
