import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import Users from './components/Users.js';

class App extends Component {
  signOut() {
    localStorage.removeItem('jwt');
  }

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
          <NavLink to='/users' onClick={this.redirectToUsers}>
           [ Users ] 
          </NavLink>
          <NavLink to='/' onClick={this.signOut}>
            [ Sign out ]
          </NavLink>
        </nav>
        <main>
          <Route path='/' component={Home} exact/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/users' component={Users}/>
        </main>
      </div>
    );
  }
}

export default App;
