import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import UsersPage from './Components/UsersPage';


import {Link} from 'react-router-dom';

import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
          
            <Route exact path = '/register' render = {(props) => <SignUp {...props} />} />
            <Route exact path = '/' render = {(props) => <SignIn {...props} />} />
            <Route exact path = '/users' render = {(props) => <UsersPage {...props} />} />
          
      </div>
    );
  }
}

export default App;
