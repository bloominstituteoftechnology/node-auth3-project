import React, { Component } from 'react';
import '../App.css';
import {NavLink, Route} from 'react-router-dom';
import Register from './register';
import Home from './home';
import Login from './login';
import Users from './users';

class NavBar extends Component {
  render() {
    return (
    <header className="App-header">
        <nav>
          <NavLink exact to='/' >Home</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/register' >Register</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/login' >Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/users' >Users</NavLink>
          &nbsp; | &nbsp;
          <button>Logout</button>
        </nav>

        <Route exact path='/' component={Home} />
        <Route path='/register' render={ props => <Register {...props} /> } />
        <Route path='/login' render={ props => <Login {...props} /> } />
        <Route path='/users' render={ props => <Users {...props} /> } />
    </header>
    );
  }
}

export default NavBar;
