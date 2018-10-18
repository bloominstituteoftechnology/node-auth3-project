import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import Home from './home/Home.js';
import Signup from './signup/Signup.js';
import Login from './auth/Login.js';
import Users from './users/Users.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to='/'>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/signup'>
              Signup
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/login'>
            Login
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users'>
              Users
            </NavLink>
            &nbsp;|&nbsp;
            {/* <button onClick={}>Sign Out</button> */}
          </nav>
          <main>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/users' component={Users} />
          </main>
            
        </header>
      </div>
    );
  }
}

export default App;
