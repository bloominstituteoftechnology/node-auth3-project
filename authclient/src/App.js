import React, { Component } from "react";
import { Route, withRouter, NavLink } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import Home from "./components/Home";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Client Side Authentication</h1>
          <nav className="main-nav">
            <NavLink className="app-link" to="/" exact>
              Home
            </NavLink>
            &nbsp;&nbsp;
            <NavLink className="app-link" to="/users" exact>
              Users
            </NavLink>
            &nbsp;&nbsp;
            <NavLink
              onClick={this.logout}
              className="app-link"
              to="/signin"
              exact
            >
              Log Out
            </NavLink>
          </nav>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/users" component={Users} />
      </div>
    );
  }

  logout = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };
}

export default withRouter(App);
