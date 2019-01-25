import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Users from "./components/Users";

import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

class App extends Component {
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
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/users" component={Users} />
        </main>
      </Container>
    );
  }
}

export default App;
