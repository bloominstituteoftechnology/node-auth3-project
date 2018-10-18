import React, { Component } from "react";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import Users from "./components/users/Users";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

const Home = () => {
  return (
    <div>
      <h1>Home Component</h1>
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
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </nav>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/users" component={Users} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
