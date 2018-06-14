import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import logo from '../../logo.svg';

/**
 * IMPORT OCMPONENTS: App component is the Head of all others components.
 */
import Auth from '../Auth/Auth';
import MainContent from '../MainContent/MainContent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container custom-container">
          <div className="row">
            <div className="c-4">
              <Auth />
            </div>
            <div className="c-8">
              <Route path="/users" component={MainContent} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
