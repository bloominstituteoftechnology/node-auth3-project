import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Users from './components/Users';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

class App extends Component {
  logoutHandle = () => {
    localStorage.removeItem('jwt');
    document.location.reload();
  };

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/login">Login</NavLink>
          <button onClick={this.logoutHandle}>Sign Out</button>
        </nav>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/register" render={props => <Register {...props} />} />
        </main>
      </div>
    );
  }
}

export default App;
