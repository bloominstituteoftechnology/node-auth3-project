import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Users from './components/users/Users'
import { withRouter } from 'react-router'
import AuthContainer from './components/auth/AuthContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signin' component={AuthContainer} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
