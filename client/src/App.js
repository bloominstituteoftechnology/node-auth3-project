import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom';

import Signup from "./components/signup";
import Signin from './components/signin';
import Users from './components/users'

class App extends Component {

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/signin');
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
          <div>
            {localStorage.getItem('jwt') && (
              <button onClick={this.signout}>Signout</button>
            )}
          </div>
        </header>
        <Link to="/signup"><h1>Sign Up</h1></Link>
        <Link to="/signin"><h1>Sign In</h1></Link>
        <Route path="/signup" component={ Signup }/>
        <Route path="/signin" component={ Signin }/>
        <Route path="/users" component={ Users } />
      </div>
    );
  }
}

export default withRouter(App);
