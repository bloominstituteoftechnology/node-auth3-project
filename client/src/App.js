import React, { Component } from 'react';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Logout from './components/Logout.js';

class App extends Component {
  render() {
    return (
      <div className = "App">
      <header>
          <nav>
            <NavLink to = '/'>Home</NavLink>
            <NavLink to = '/register'>Register</NavLink>
            <NavLink to = '/login'>Login</NavLink>
            <NavLink to = '/logout'>Logout</NavLink>
            
          </nav>
      </header>

      <Switch>    
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/logout" component = {Logout} />
      </Switch>

      </div>
    );
  }
}

export default withRouter(App);
