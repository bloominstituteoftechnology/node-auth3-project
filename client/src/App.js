import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './components/Register.js';
import Login from './components/Login.js';
import Users from './components/Users.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>My App</header>
        <section>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/users' component={Users} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
