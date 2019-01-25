import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";

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
            &nbsp;|&nbsp;
            <NavLink to="/signin" exact>
              Signin
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users" exact>
              Users
            </NavLink>
          </nav>

          <Route path='/' component={Home} exact/>
          <Route path='/users' component={Users} exact/>
        </header>
      </div>
    );
  }
}

export default App;
