import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

import Users from './users/Users';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

const Home = props => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/' exact>
            Home
            </NavLink>
             &nbsp;|&nbsp;
            <NavLink to='/signin'>
            Sign In
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/signup'>
            Sign Up
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to= '/users'>
            Users
            </NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} exact></Route>
        <Route exact path="/signin" render={(props) =>  <Signin {...props}/>} />
        <Route exact path="/signup" render={(props) =>  <Signup {...props}/>} />
        <Route exact path="/users" render={(props) =>  <Users {...props}/>} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;