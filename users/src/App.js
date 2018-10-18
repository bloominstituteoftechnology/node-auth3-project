import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Users from './users/Users';
import Signin from './auth/Signin';

import './App.css';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Welcome to the Company</h1>
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin" onClick={this.signout}>Sign Out</NavLink>
          </nav>
          </header>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/users" component={Users} />
            <Route path="/signin" component={Signin} />
          </main>
        
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem('jwt');
  };
}

export default App;

// white-list: keep a list of valid tokens on the db

// black-list: keep a list of blaclisted tokens on the db

// on every request you have to check your list

// access token (short lived) + refresh token (long lived)
