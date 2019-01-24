import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>
            Home
          </NavLink>
        </nav>
        <main>
          <Route path='/' component={Home} exact/>
        </main>
      </div>
    );
  }
}

export default App;
