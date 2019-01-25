import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Header from './components/public/Header';

import PublicRouter from './components/public/PublicRouter';
import AuthRouter from './components/auth/AuthRouter';
import UserRouter from './components/users/UserRouter';

import axiosConfig from './config/axiosConfig';
axiosConfig(localStorage);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={PublicRouter} />
        <Route path="/auth" component={AuthRouter} /> 
        <Route path="/users" component={UserRouter} />
      </div>
    );
  }
}

export default App;
