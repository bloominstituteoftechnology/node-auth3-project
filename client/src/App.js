import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>WELCOME TO MY SHITTY USERS THING</h1>
        <Route exact path="/signup" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
