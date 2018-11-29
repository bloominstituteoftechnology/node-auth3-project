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
            <Route path="/Register" component={Register} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
