import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import './App.css';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import UserList from './components/UserList/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignIn />
        <SignUp />
        <UserList />
      </div>
    );
  }
}

export default App;
