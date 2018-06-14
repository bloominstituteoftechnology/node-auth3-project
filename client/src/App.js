import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import { Navigation, UserList, Login, Register } from "./components/index.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/users" component={UserList}/>
      </div>
    );
  }
}

export default App;
