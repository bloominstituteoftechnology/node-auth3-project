import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <SignUp />
          <SignIn />
          <Users />
        </Switch>
      </div>
    );
  }
}

export default App;
