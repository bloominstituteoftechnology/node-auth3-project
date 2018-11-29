import React, { Component } from 'react';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Users from './components/Users.js';
import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'> Home</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </nav>
        <h1> Welcome Please Register or Login</h1>
        <section>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/users' component={Users} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
