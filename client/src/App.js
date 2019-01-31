import React, { Component } from "react";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { NavLink, Route } from "react-router-dom";

import "./App.css";

const Home = props => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/signup">Sign up</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/signin">Sign in</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp; | &nbsp;
            <button onClick={this.signOut}>Sign out</button>
          </nav>
        </header>
        <main>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/users" component={Users} exact />
        </main>
      </div>
    );
  }

  signOut = () => {
    localStorage.removeItem("jwt");
    console.log("signed out successfully");
  };
}

export default App;
