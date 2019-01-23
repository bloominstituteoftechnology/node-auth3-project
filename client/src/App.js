import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import {
  UikNavPanel,
  UikContainerVertical,
  UikNavSection,
  UikNavLink
} from "./@uik/index";

import Users from "./components/Users";
import Home from "./components/Home";
import Signin from "./components/Signin";

import "./@uik/styles.css";
import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  /* margin: 0 auto;
  max-width: 880px; */
`;

class App extends Component {
  render() {
    return (
      <Container>
        <UikNavPanel>
          <UikContainerVertical>
            <UikNavSection>
              <UikNavLink Component={NavLink} to={"/"}>
                Home
              </UikNavLink>
              <UikNavLink Component={NavLink} to={"/users"}>
                Users
              </UikNavLink>
              <UikNavLink Component={NavLink} to={"/signin"}>
                Login
              </UikNavLink>
            </UikNavSection>
          </UikContainerVertical>
        </UikNavPanel>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={Signin} />
        </main>
      </Container>
    );
  }
}

export default App;
