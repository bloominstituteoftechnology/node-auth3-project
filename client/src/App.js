import React, { Component } from 'react';
import ring from './oneringGIF.gif';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ring} className="ring-logo" alt="logo" />
          <h1 className="App-title">LOTR Database:</h1>
        </header>
      </div>
    );
  }
}

export default App;
