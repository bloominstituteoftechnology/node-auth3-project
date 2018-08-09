import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Signin from './components/auth/Signin'
import Users from './components/users/Users'
import { withRouter } from 'react-router'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
