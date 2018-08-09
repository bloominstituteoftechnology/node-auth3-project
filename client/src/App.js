import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            <Link to='/signup'>Sign Up</Link><br/>
            <Link to='/signin'>Sign In</Link>
            <Route exact path='/signin' component={ Signin } ></Route>
            <Route exact path='/users' component={ Users } ></Route>
            <Route exact path='/signup' component={ Signup } ></Route>
          

         
        </div>
      </div>
    );
  }
 
}



export default withRouter(App);
