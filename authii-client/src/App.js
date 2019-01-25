import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import Users from './components/Users';
import Signin from './components/Signin';
import Register from './components/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/register">Register</Link>
            &nbsp;|&nbsp;
            <Link to="/signin">Sign-in</Link>
            &nbsp;|&nbsp;
            <Link to="/users">User List</Link>
          </nav>
          <main>
            <Route path="/register" component={Register}>Register</Route>
            <Route path="/signin" component={Signin}>Register</Route>
            <Route path="/users" component={Users}>Register</Route>

          </main>
        </header>
      </div>
    );
  }
}

export default App;
