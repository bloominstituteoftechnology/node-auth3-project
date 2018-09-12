import React, { Component } from 'react';

import "../components/App.css";
import {Route} from 'react-router-dom';
import Register from './signup';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path ="/signup" component = {Register} />
      </div>
    );
  }
}

export default App;
