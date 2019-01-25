import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Users from '../src/components/Users';

import './App.css';

const Home = props => {
  return (
    <div>
      <h2>Welcome to</h2>
      <h1>Auth-II!!</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/users'>Users</NavLink>
          </nav>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/users' component={Users} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
