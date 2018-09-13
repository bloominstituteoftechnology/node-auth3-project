import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Route from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Route path='/' component = {Login} />
    );
  }
}

export default App;
