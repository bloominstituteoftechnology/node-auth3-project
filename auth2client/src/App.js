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
            <br />
            <NavLink to ='/signup'>
              Sign Up
            </NavLink>
            <br />
            <NavLink to='/signin'>
              Sign In
            </NavLink>
            <br />
            <NavLink to='/users'>
              Users
            </NavLink>
            <br />
            <button onClick={this.signout}>Sign Out</button>
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

  signout = () => {
    localStorage.removeItem('jwt');
  }
}

export default App;