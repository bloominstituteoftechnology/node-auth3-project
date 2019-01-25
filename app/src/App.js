import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import './App.css';

class App extends Component {

  addNewUser = user => {
    axios.post('http://localhost:3300/api/register', user)
      .then(res => {
        console.log('user is registered');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Route path='/' component={Home} />
        <Route path='/signup' render={props => <SignUpForm {...props} addNewUser={this.addNewUser} />} />
      </div>
    );
  }
}

export default App;
