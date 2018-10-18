import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, NavLink, Route} from 'react-router-dom';

import UserList from './components/UserList';
import Login from './components/Login';

const Home = (props) => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  )
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to = '/' exact>Home</NavLink>
            <NavLink to = '/users'></NavLink>
            <NavLink to = '/login'>Login</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path = '/' component = {Home} />
          <Route path = '/users' component = {UserList} />
          <Route path = '/login' component = {Login} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
