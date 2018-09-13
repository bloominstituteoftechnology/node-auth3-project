import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Users from "./components/Users";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false
    };
  }

  logOut = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };

  render() {
    return (
      <div>
        <Link to="/signin">
          <button>Sign in page</button>{" "}
        </Link>
        <Link to="/signup">
          <button>Sign up page</button>{" "}
        </Link>
        <Link to="/users">
          <button>Users</button>{" "}
        </Link>
        <button onClick={this.logOut}>Log out</button>
        <Route path="/signup" render={props => <Signup {...props} />} />
        <Route path="/signin" render={props => <Signin {...props} />} />
        <Route path="/users" render={props => <Users {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
