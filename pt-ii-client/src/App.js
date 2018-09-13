import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Users from "./users/Users";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <button onClick={this.logout}>Logout</button>
          </div>
        </header>

        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Users} />
      </div>
    );
  }

  logout = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };
}

export default withRouter(App);
