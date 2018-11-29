import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';

import Users from './users/Users';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';

const Home = props => {
  return (
    <div>
      <h1>HOME</h1>
      <p>Welcome to the employee portal. Sign in or register an account.</p>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <nav className='nav'>
            <NavLink className='nav__item' to='/' exact>
              Home
            </NavLink>
            <NavLink className='nav__item' to='/users'>
              Users
            </NavLink>
            <NavLink className='nav__item' to='/signin'>
              Sign In
            </NavLink>
            <NavLink className='nav__item' to='/signup'>
              Sign Up
            </NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} exact />
            <Route path='/users' component={Users} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
