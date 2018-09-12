import React, { Component } from 'react';

import "../components/App.css";
import {Route} from 'react-router-dom';
import Register from './signup';
import Signin from './signin';
import ShowUsers from './showusers';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path ="/signup" component = {Register} />
        <Route exact path ="/signin" component = {Signin} />
        <Route exact path ="/showusers" component = {ShowUsers} />
      </div>
    );
  }
}

export default App;
