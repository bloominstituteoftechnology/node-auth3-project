import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

import Users from './components/Users';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';

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
            <NavLink to ='/signup'>
              Sign Up
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/signin'>
              Sign In
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users'>
              Users
            </NavLink>
          </nav>

          <main>
            <Route exact path ='/' component={Home} />
            <Route exact path ='/signup' component={Signup} />
            <Route exact path ='/signin' component={Signin} />
            <Route exact path ='/users' component={Users} />
          </main>

        </header>
      </div>
    );
  }
}

export default App;
