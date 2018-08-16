import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './styling/App.css';
import Signin from '../src/components/signin';
import Users from '../src/components/users';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
      

      <Route path ="/signin" component={Signin}></Route>
      <Route path ="/users" component={Users}></Route>
      </div>
    );
  }
}

export default App;
