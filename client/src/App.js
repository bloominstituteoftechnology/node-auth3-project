import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, withRouter } from "react-router";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
          {localStorage.getItem("token") ? (
            <button onClick={this.signout}>Sign Out</button>
          ) : (
            <button
              onClick={() => {
                this.props.history.push("/register");
              }}
            >
              Register
            </button>
          )}
        </header>

        <Route path="register" component={Register} />
        {/* <Route path="signin" component={Signin} />
        <Route path="users" component={Users} /> */}

        <p className="App-intro">
          Please implement the required code for the assignment.
        </p>
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/signin");
  };
}

export default App;
