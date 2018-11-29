import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props)= {
    loggedIn: false,
    users: [],
  }
}

export default App;
