import React, { Component } from 'react';
import ring from './oneringGIF.gif';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { SignUp, SignIn } from './cmpnts'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ring} className="ring-logo" alt="logo" />
          <h1 className="App-title">LOTR Database:</h1>
        </header>
        <div className="portal-box">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
          <button onClick={this.logout}>logout</button>
        </div>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </div>
    );
  }
}

export default App;
