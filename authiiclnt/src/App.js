import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Usrs from './usrs/Usrs';
import Lgn from './auth/Lgn';
import Rgtr from './auth/Rgtr';

import './App.css';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  lgo = () => {
    localStorage.removeItem('jwt');
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to="/">
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/usrs">Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/rgtr">Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/lgn">Login</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.lgo}>Logout</button>
          </nav>
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/usrs" component={Usrs} />
            <Route path="/rgtr" component={Rgtr} />
            <Route path="/lgn" component={Lgn} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
