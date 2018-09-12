import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/users">Users</Link>
        </header>
        <Route exact path="/" render={() => <SignUp />} />
      </div>
    );
  }
}

export default App;
