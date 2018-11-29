import React, { useState } from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import GlobalStyle from "../global-styles";

import Users from "../components/Users";
import Navigation from "../components/Navigation";
import Login from "../components/Form/Login";
import SignUp from "../components/Form/SignUp";

const App = ({ history }) => {
  const [loggedIn, setLogin] = useState(false);

  const logOut = e => {
    e.preventDefault();
    setLogin(false);
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <GlobalStyle />
      <Navigation loggedIn={loggedIn} logOut={logOut} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Users {...props} setLogin={setLogin} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
};

export default withRouter(App);
