import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Signin from "./auth/Signin.js";
import Signup from "./auth/Signup.js";
import Users from "./users/Users.js";
import jwt_decode from "jwt-decode";

class App extends Component {
  render() {
    let decodedToken = jwt_decode(localStorage.getItem("jwt"));
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
        </header>
        <Route
          exact
          path="/"
          render={() => {
            if (decodedToken.username)
              return "Welcome back, " + decodedToken.username + "!";
            else return "Welcome, guest!";
          }}
        />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
