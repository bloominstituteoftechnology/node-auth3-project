import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList';
import { Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
        <Link to="/users">Users list</Link>
        <Link to="/logout">Log out</Link>
        <Route path="/register" render={props => (<Register {...props} />)} />
        <Route path="/login" render={props => (<Login {...props} />)} />
        <Route path="/users" render={props => (<UsersList {...props} />)} />
      </div>
    );
  }
}

export default App;
