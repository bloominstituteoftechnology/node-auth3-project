import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Signin from "./components/Signin.js";
import Signup from "./components/Signup.js";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Users</h1>
        </header>

        <Route exact path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
