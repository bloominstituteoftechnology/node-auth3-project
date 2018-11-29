import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';

import Users from './users/Users';
import Signin from './auth/Signin';

const Home = props => {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <nav>
            <NavLink to='/' exact>
              Home
            </NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/signin'>Sign In</NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} exact />
            <Route path='/users' component={Users} />
            <Route path='/signin' component={Signin} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
