import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
