import React, { Component } from 'react';

import Register from './components/Register'
import './App.css';
import { Switch, Route, } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <Switch>
            <Route path="/register" Component={Register}></Route>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
