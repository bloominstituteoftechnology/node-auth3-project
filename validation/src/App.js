import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import "./App.css";

import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import Users from "./Users/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={this.logout}>Logout</button>

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
