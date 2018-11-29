import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './components/register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <Switch>
            <Route path="/register" component="Register" />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
