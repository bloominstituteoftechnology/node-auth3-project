import React, { Component } from 'react';
import SignUp from './Components/SignUp';
import Users from './Components/Users'
import Home from './Components/Home'
import { Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path="/" component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/api/users' component={Users} />
      </div>
    );
  }
}

export default App;
