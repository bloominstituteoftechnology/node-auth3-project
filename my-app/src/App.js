import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import "./App.css";

import Login from "./Login/Login";
import Users from "./Users/Users";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <NavLink to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/users">Users</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.logout}>Logout</button>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }

  logout = () => {
    localStorage.removeItem("token");
  };
}

function Home(props) {
  return <h1>Home Component</h1>;
}

export default App;
