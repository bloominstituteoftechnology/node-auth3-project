import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './components/Register.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>My App</header>
        <section>
          <Switch>
            <Route path='/register' component={Register} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
