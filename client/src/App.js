import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import Users from "./components/Users";
import Home from "./components/Home";
import Signin from "./components/Signin";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/signin">Login</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={Signin} />
        </main>
      </div>
    );
  }
}

export default App;
