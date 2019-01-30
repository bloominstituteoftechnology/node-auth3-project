import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const Home = props => {
  return (
    <div>
      <h1>Home</h1>
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
            &nbsp; |&nbsp;
            <NavLink to="/signup">Sign up</NavLink>
            &nbsp; |&nbsp;
            <NavLink to="/signin">Sign in</NavLink>
            &nbsp; |&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp; |&nbsp;
            <button onClick={this.signout}>Sign Out</button>
          </nav>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/users" component={Users} exact />
            <Route path="/signup" component={Signup} exact />
          </main>
        </header>
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem("jwt");
  };
}

export default App;
