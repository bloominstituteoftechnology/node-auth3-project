import React, { Component } from 'react';
import './App.css';
import {Route, withRouter, NavLink} from 'react-router-dom';
import styled from 'styled-components';

import Login from './Components/login';
import Register from './Components/register';
import Users from './Components/users';
import Home from './Components/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
