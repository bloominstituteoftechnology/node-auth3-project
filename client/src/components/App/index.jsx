import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "../Home";
import Users from "../Users";
import Signin from "../Auth/Signin";
import Signup from "../Auth/Signup";

import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;&nbsp;
            <NavLink to="/signin">Signin</NavLink>
            &nbsp;&nbsp;
            <NavLink to="/signup">Signup</NavLink>
            &nbsp;&nbsp;
            <button onClick={this.signout} className="signout">
              Signout
            </button>
          </nav>
          <main className="mainContent">
            <Route path="/" component={Home} exact />
            <Route path="/users" component={Users} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
          </main>
        </header>
      </div>
    );
  }

  signout = () => {
    // clear jwt from localstorage
    localStorage.removeItem("jwt");
    // redirect to home page
    this.props.history.push("/");
  };
}

export default withRouter(App); // wrap the app component in hoc withRouter
