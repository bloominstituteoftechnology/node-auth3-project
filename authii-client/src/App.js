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
            &nbsp;|&nbsp;
          </nav>
          <main>
            <Route path="/register" component={Register}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/users" component={Users}></Route>

          </main>
        </header>
      </div>
    );
  }
}

export default App;
