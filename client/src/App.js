import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList';
import Logout from './components/Logout';
import { Route, Link } from 'react-router-dom'

class App extends Component {

  state = {
    token: ''
  }

  setTokenState = (inputToken) => {
    this.setState(function () {
      return {token: inputToken}
    })
  }

  render() {
    return (
      <div className="App">
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
        <Link to="/users">Users list</Link>
        <Link to="/logout">Log out</Link>
        <Route path="/register" render={props => (<Register {...props} />)} />
        <Route path="/login" render={props => (<Login setToken={this.setTokenState} {...props} />)} />
        <Route path="/users" render={props => (<UsersList token={this.state.token} {...props} />)} />
        <Route path="/logout" render={props => (<Logout {...props} />)} />
      </div>
    );
  }
}

export default App;
