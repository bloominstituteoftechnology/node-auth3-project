import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Users from "./components/Users";
import Signin from "./components/Signin";

import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

class App extends Component {
  signOut = () => {
    localStorage.removeItem("jwt");
  };

  render() {
    return (
      <Container>
        <NavLink Component={NavLink} to={"/"}>
          Home
        </NavLink>
        <NavLink Component={NavLink} to={"/signup"}>
          Signup
        </NavLink>
        <NavLink Component={NavLink} to={"/users"}>
          Users
        </NavLink>
        <NavLink Component={NavLink} to={"/signin"}>
          Signin
        </NavLink>
        <button onClick={this.signOut} error>
          Sign Out
        </button>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={Signin} />
        </main>
      </Container>
    );
  }
}

export default App;
