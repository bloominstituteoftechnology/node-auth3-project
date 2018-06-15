import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Signin from './components/Signin';
import Users from './components/Users';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        <div>
          {localStorage.getItem('jwt') && (
            <button onClick={this.signout}>Log Out</button>
          )}
        </div>
        </header>
          <Route path="/signin" component={Signin} />
          <Route path="/users" component={Users} />
          <Route path='/register' component={Register} />
      </div>
    );
  }
  signout = () => {
    if(localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/signin');
    }
  }
}

export default withRouter(App);
