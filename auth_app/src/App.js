import React, { Component } from 'react';
import {NavLink, Route } from 'react-router-dom';
import './App.css';

import  Users from './components/Users';
import  Home from './components/Home';
// import Signin from './components/Signin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>Home</NavLink>&nbsp;|&nbsp;
            {/* <NavLink to='/signing'>Sign in</NavLink>&nbsp;|&nbsp; */}
            <NavLink to='/users'>Users</NavLink>
          </nav>  
          <main>
            <Route path='/' component={Home} exact></Route>
            {/* <Route path='/sign-in' component={Signin} exact></Route> */}
            <Route path='/users' component={Users} exact></Route>
          </main>
        </header>
      </div>
    );
  }
}

export default App;
