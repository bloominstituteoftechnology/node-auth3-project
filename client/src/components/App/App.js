import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header';
import SignUpView from '../Page/SignUpView';
import SignInView from '../Page/SignInView';
import UsersView from '../Page/UsersView';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Route path="/" component={Header} />
        <Route exact path="/signup" component={SignUpView} />
        <Route exact path="/signin" component={SignInView} />
        <Route exact path="/users" component={UsersView} />
      </div>
    );
  }
}

export default App;
