import React from "react";
import { NavLink } from "react-router-dom";

import { Header, Nav } from "./Navigation.css";

const Navigation = ({ loggedIn, logOut }) => (
  <Header>
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink
        to="/login"
        style={loggedIn ? { display: "none" } : { display: "flex" }}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        style={loggedIn ? { display: "none" } : { display: "flex" }}
      >
        Register
      </NavLink>
    </Nav>
    <button
      onClick={logOut}
      style={loggedIn ? { display: "flex" } : { display: "none" }}
    >
      Log Out
    </button>
  </Header>
);

export default Navigation;
