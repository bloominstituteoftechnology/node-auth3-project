import React, { Component } from "react";
import { Route, NavLink } from 'react-router-dom';

import Login from './login/Login';

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </header>
        <main>
          {/* <Route path="/" component={Home} /> */}
          <Route path="/login" component={Login} />
          {/* <Route path="/users" component={Users} /> */}
        </main>
      </>
    )
  }
}

export default App;
