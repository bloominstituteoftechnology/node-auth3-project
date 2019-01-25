import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";

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
        <NavLink Component={NavLink} to={"/register"}>
          Register
        </NavLink>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
        </main>
      </Container>
    );
  }
}

export default App;
