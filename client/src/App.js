import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Signin from "./auth/Signin";
import Users from "./users/Users";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  handleLogout = event => {
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
            <button onClick={this.handleLogout}>Logout</button>
          )}
        </div>

        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
