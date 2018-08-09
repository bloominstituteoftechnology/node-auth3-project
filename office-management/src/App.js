import React from "react";
import { Route } from "react-router";
import styled from "styled-components";
import RegisterForm from "./components/register/RegisterForm";
import LoginForm from "./components/login/LoginForm";
import UserContainer from "./components/view-users/UsersContainer";

const AppWrapper = styled.div``;
const App = () => {
  return (
    <AppWrapper>
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/users" component={UserContainer} />
    </AppWrapper>
  );
};

export default App;
