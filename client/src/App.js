import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Users from "./components/users";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }


  render() {
    return (
      <div className="App">
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App;
