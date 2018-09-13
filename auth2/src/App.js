import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router";

import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Users from "./Components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
