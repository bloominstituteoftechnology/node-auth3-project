import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Users from "./components/Users";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  handleSignout = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {localStorage.getItem("jwt") && (
            <button onClick={this.handleSignout}>Signout</button>
          )}
        </div>

        <Route
          exact
          path="/signup"
          render={() =>
            localStorage.getItem("jwt") ? <Redirect to="/users" /> : <Signup />
          }
        />
        <Route
          exact
          path="/signin"
          render={() =>
            localStorage.getItem("jwt") ? <Redirect to="/users" /> : <Signin />
          }
        />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
