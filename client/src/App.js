import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import {
  UikNavPanel,
  UikContainerVertical,
  UikNavSection,
  UikNavLink,
  UikButton
} from "./@uik/index";

import Users from "./components/Users";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

import "./@uik/styles.css";
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
        <UikNavPanel>
          <UikContainerVertical>
            <UikNavSection>
              <UikNavLink Component={NavLink} to={"/"}>
                Home
              </UikNavLink>
              <UikNavLink Component={NavLink} to={"/users"}>
                Users
              </UikNavLink>
              <UikNavLink Component={NavLink} to={"/signup"}>
                Register
              </UikNavLink>
              <UikNavLink Component={NavLink} to={"/signin"}>
                Login
              </UikNavLink>
              <UikButton onClick={this.signOut} error>
                Sign Out
              </UikButton>
            </UikNavSection>
          </UikContainerVertical>
        </UikNavPanel>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
        </main>
      </Container>
    );
  }
}

export default App;
