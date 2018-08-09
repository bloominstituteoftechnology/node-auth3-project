import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Users from './components/Users';
import SignUp from './components/SignUp';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={Main} />
      </div>
    );
  }
}

export default App;
