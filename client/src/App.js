import React, { Component } from 'react';
import SignUp from './Components/SignUp';
import Users from './Components/Users';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import { Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path='/' component={Home} />
        <Route path='/api/users' component={Users} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
      </div>
    );
  }
}

export default App;
