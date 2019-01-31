import React, { Component } from "react";
import Users from "./components/Users";
import SignIn from "./components/SignIn";
import { NavLink, Route } from "react-router-dom";

import "./App.css";

const home = props => {
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
        <header>
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/signin">Sign in</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp; | &nbsp;
            <button onClick={this.signOut}>Sign out</button>
          </nav>
        </header>
        <main>
          <Route path="/" component={home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/users" component={Users} />
        </main>
      </div>
    );
  }

  signOut = () => {
    localStorage.removeItem("jwt");
  };
}

export default App;
