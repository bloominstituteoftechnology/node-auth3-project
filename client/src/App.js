import React, { Component } from 'react';
import { Route} from 'react-router-dom';
// import {Switch, Route} from 'react-router-dom';
import Register from './Register';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        hello
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
