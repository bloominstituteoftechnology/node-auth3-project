import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'
import './App.css';
import Users from './users/Users'
import {Register, Signin} from './auth'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <header>
            <nav>
              <NavLink to='/signup'>Register</NavLink>
              <NavLink to='/signin'>Signup</NavLink>
              <NavLink to='/users'>Users</NavLink>
            </nav>
          </header>
          <main>
            <Route path='/signup' component={Register}/>
            <Route path='/sign' component={Signin}/>
            <Route path='/users' component={Users}/>
            <div>
              <button>Sign out</button>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
