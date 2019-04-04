import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:6500/api";

axios.interceptors.request.use(function(requestConfig) {
  const token = localStorage.getItem("token");
  requestConfig.headers.authorization = token;
  return requestConfig;
});

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("token");
      const notLoggedIn = <h3>Please login to see the users</h3>;

      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
