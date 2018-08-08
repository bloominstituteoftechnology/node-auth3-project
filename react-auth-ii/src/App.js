import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route path='/signin' component={Login} />     
      <Route path='/signup' component={Register} />
      <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
