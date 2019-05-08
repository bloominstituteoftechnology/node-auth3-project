import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

axios.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  req.headers.authorization = token;
  return req;
});

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      render={props =>
        token ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { message: "Please login to access this page." }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
