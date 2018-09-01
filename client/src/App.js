import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './auth/Login';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          We are on. 
        </p>

        <Route path = "/login" component= {Login}></ Route>
      </div>
    );
  }
}

export default App;
