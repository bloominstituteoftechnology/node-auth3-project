import React, { Component } from 'react';
import './App.css';
import Register from './components/Register';

import {Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
        </header>

        <section>
          <Switch>
            <Route path="/register" />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
