import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';

import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">Hello!</header> */}
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
