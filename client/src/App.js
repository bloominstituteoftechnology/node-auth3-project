import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import Home from "./components/Home";

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
        <main>
          <Route exact path="/" component={Home} />
        </main>
      </Container>
    );
  }
}

export default App;
