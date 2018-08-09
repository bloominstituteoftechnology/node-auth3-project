import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
// import axios from 'axios';

import Signup from './Signup';
import Signin from './Signin';
import Users from './Users';

class App extends Component {
  handleLogout = e => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin');
  }
  render() {
    return (
      <div className="App">
        <h1>Home/Root</h1>
        {/* Logout Button */}
        {localStorage.getItem('jwt') && (
          <button onClick={this.handleLogout}>Logout</button>
        )}
        {/* Routes */}
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
