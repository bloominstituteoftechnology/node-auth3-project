import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";

import Users from "./components/Users.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  signOut() {
    localStorage.removeItem("jwt");
  }

  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <button onClick={this.signOut}>Log Out</button>
        </nav>

        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </main>
      </div>
    );
  }
}

export default App;
