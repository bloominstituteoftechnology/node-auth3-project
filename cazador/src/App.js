import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signup" component={RegisterForm} />
        <Route path="/users" component={UsersList} />
        <Route path="/signin" component={LoginForm} />

      </div>
    );
  }
}

export default App;
