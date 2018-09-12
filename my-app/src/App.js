import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Singup from "./components/Signup";
import Signin from "./components/Signin";
import Users from "./components/Users";
import Nav from "./components/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Route exact path="/signup" render={props => <Singup {...props} />} />
        <Route exact path="/signin" render={props => <Signin {...props} />} />
        <Route exact path="/users" render={props => <Users {...props} />} />
      </div>
    );
  }
}

export default App;
