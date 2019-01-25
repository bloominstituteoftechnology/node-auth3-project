import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import './App.css';

class App extends Component {

  addNewUser = user => {
    axios.post('http://localhost:3300/api/register', user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logIn = user => {
    axios.post('http://localhost:3300/api/login', user)
      .then(res => {
        console.log(res.data);
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
        <Route path='/signin' render={props => <SignInForm {...props} logIn={this.logIn} />} />
      </div>
    );
  }
}

export default App;
