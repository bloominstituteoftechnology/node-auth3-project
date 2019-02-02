import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>Some text goes here.</p>
          {/* client side routes for
          - signup -- form gathering username, password, department
          - sign in
          - show list of users */}
        </header>
      </div>
    );
  }
}

export default App;
