import React, { Component } from 'react';
import { Route} from 'react-router-dom';
// import {Switch, Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      users: [],
    }
  }

  authenticate =() => {
    const token = localStorage.getItem('seecret')

    if(token) {

    }
  }
  componentDidMount() {
    this.authenticate()
  }

  render() {
    return (
      <div className="App">
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

export default App;
