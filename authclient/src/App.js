import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/users'>Users</NavLink>
          </nav>
          <main>
            <Route path='/' Component={Home}></Route>
            <Route path='/users' Component={Users}></Route>
          </main>
        </header>
      </div>
    );
  }
}

export default App;