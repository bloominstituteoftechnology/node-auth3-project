import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/Users';

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
          <nav>
            <NavLink exact to='/'>Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users'>Users</NavLink>
          </nav>
          <main>
            <Route exact path='/' Component={Home}></Route>
            <Route path='/users' Component={Users}></Route>
          </main>
        </header>
      </div>
    );
  }
}

export default App;