import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Users from "./components/Users";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

class App extends Component {
  signOut = () => {
    localStorage.removeItem("jwt");
  };

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/signup">Signup</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/login">Login</NavLink>
            &nbsp; | &nbsp;
            <button onClick={this.signOut}>logout</button>
          </nav>
          <main>
            <Route path="/signup" component={SignUp} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
