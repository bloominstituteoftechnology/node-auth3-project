import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'; 
import SignupPage from './Components/SignupPage';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path = "/signup" component = {SignupPage} />
      </div>
    );
  }
}

export default App;
