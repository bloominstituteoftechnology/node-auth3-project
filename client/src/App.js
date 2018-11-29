import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.css';
import Register from './register/Register.js';
import Signin from './auth/Signin.js';
import Users from './users/Users.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={event => this.signout(event)}>Sign Out</button>
        <Route path='/register' render={(props) => <Register {...props} />} />
        <Route path='/signin' render={(props) => <Signin {...props} />} />
        <Route path='/users' render={(props) => <Users {...props} />} />
      </div>
    );
  }

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/signin');
    }
  }
}

export default withRouter(App);
