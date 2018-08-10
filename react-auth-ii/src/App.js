import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {Route} from 'react-router-dom';
import Users from './components/Users';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">

      <Route path='/' component={Home} />
      <Route path='/signin' component={Login} />  
      <Route path='/signup' component={Register} />
      <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
