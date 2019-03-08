import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './auth/NavBar'
import Login from './auth/login'
import Users from './users/users'
import Register from './auth/register'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <NavBar />
       <main>
          <Route path='/login' component={Login} />
          <Route path='/users' component={Users} />
          <Route path='/register' component={Register} />
        </main>
      </div>
    );
  }
}

export default App;
