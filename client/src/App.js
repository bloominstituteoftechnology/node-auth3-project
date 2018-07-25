import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, withRouter } from "react-router-dom";

import Register from "./Components/Register";
import Signin from "./Components/Signin";
import Users from "./Components/Users";

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
            <div>
              <button
                onClick={() => {
                  this.props.history.push("/register");
                }}
              >
                Register
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/signin");
                }}
              >
                Login
              </button>
            </div>
          )}
        </header>

        <Route path="/register" component={Register} />
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/signin");
  };
}

export default withRouter(App);
