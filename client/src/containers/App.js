import React, { useState, useEffect } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import GlobalStyle from "../global-styles";

import Users from "../components/Users";
import Navigation from "../components/Navigation";
import Login from "../components/Form/Login";
import SignUp from "../components/Form/SignUp";

import { URL } from "../constants";

const App = ({ history, location }) => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLogin] = useState(false);

  const authenticate = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        authorization: token
      }
    };
    token
      ? axios
          .get(`${URL}users`, options)
          .then(res => {
            if (res.status === 200 && res.data) {
              setLogin(true);
              setUsers(res.data);
            } else {
              throw new Error();
            }
          })
          .catch(err => {
            console.error(err);
            history.push("/login");
          })
      : history.push("/login");
  };

  useEffect(() => authenticate(), [
    location.pathname === "/" && location.pathname
  ]);

  const logOut = e => {
    e.preventDefault();
    setLogin(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <GlobalStyle />
      <Navigation loggedIn={loggedIn} logOut={logOut} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Users {...props} users={users} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
};

export default withRouter(App);
