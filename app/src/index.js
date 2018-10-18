import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

ReactDOM.render(
  <Router>
    <nav>
      <NavLink activeClassName="selected" to="/home">
        Home
      </NavLink>
      <NavLink activeClassName="selected" to="/register">
        Register
      </NavLink>
      <NavLink activeClassName="selected" to="/login">
        Login
      </NavLink>
      <NavLink activeClassName="selected" to="/users">
        Users List
      </NavLink>
      <NavLink
        to="/logout"
        activeClassName="selected"
        onClick={() => {
          localStorage.removeItem("jwt");
          window.location.href = "http://localhost:9001/login"
        }}
      >
        Logout
      </NavLink>
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/users" render={props => <UserList {...props} />} />
    </nav>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
