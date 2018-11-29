import React, { Component } from 'react';

import Register from './components/Register'
import Login from './components/Login';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <Switch>
            <Route path="/Register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
