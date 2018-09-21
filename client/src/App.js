import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom"; //component to navigate through pages
import logo from "./logo.svg";
import "./App.css";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Users from "./users/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome </h1>
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
