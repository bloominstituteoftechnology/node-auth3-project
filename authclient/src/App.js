import React, { Component } from "react";
import { Route, withRouter, NavLink } from "react-router-dom";
import SignIn from "./components/SignIn";
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
          <h1>Welcome!</h1>
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/users" exact>
              Users
            </NavLink>
          </nav>
          <div>
            <button onClick={this.logout}>Log Out</button>
          </div>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
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
