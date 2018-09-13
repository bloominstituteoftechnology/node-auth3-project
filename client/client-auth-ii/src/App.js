import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Home from './components/containers/Home';
import Users from './components/containers/Users';
import Register from './components/forms/authentication/Register';
import Login from './components/forms/authentication/Login';

import logo from './logo.svg';
import './App.css';

//<Route path="/users/:id" render={props => <UserInfo {...props} /> } />

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <section>
              <NavLink path="/users"></NavLink>
            </section>
            <section>
              <div>
                <NavLink><img src={logo} className="App-logo" alt="logo" /></NavLink>
              </div>
              <div>
                <h1 className="App-title">Welcome to React</h1>
              </div>
            </section>
            <section>
              <NavLink path="/users/:id"></NavLink>
            </section>
          </header>

          {/*Routes*/}
          <Route path="/" render={props => <Home {...props} /> } />
          <Route path="/register" render={props => <Register {...props} /> } />
          <Route path="/login" render={props => <Login {...props} /> } />
          <Route path="/users" render={props => <Users {...props} /> } />
        </div>
      </Router>
    );
  }
}

export default App;
