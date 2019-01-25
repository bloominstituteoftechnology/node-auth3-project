import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home.js'
import SignUp from './components/SignUp.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>
           [ Home ] 
          </NavLink>
          <NavLink to='/signup'>
           [ Sign up ] 
          </NavLink>
          <NavLink to='/signin'>
           [ Sign in ] 
          </NavLink>
          <NavLink to='/users'>
           [ Users ] 
          </NavLink>
        </nav>
        <main>
          <Route path='/' component={Home} exact/>
          <Route path='/signup' component={SignUp}/>
        </main>
      </div>
    );
  }
}

export default App;
