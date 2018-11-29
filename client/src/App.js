import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import Login from './components/Login';
import Users from './components/Users';
import Register from './components/Register';

import logo from './logo.svg';
import './App.css';

const keyName = process.env.REACT_APP_TOKEN_ITEM;

class App extends Component {

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem(keyName);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <span onClick={e => this.logout(e)} style={{cursor: 'pointer'}}>Logout</span>
          </nav>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/login" render={props => <Login {...props} />}/>
            <Route path="/register" component={Register} />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
