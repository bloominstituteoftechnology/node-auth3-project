import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Components import
import Signin from './components/Signin.js';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Hello</h1>
          <Switch>
            <Route path="/signin" component={Signin} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
