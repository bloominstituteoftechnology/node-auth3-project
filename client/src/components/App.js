import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import axios from 'axios';

import Signup from './Signup';
import Signin from './Signin';
import Users from './Users';


class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      department: ''
    }
  }

  handleChange = (e) => {this.setState({ [e.target.name]: e.target.value });}
  handleSignup = () => {
    // Put POST request to /register here.
    this.setState({ username: '', password: '', department: '' })
  }

  render() {
    return (
      <div className="App">
        <h1>Home/Root</h1>
        <Route path='/signup' render={() => <Signup state={this.state} handleChange={this.handleChange} handleSignup={this.handleSignup} />} />
        <Route path='/signin' component={Signin} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
