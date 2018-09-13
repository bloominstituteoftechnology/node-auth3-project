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

  render() {
    return (
      <div className="App">
        <Link to="/signin">
          <button>Sign in</button>{" "}
        </Link>
        <Route path="/signup" render={props => <Signup {...props} />} />
        <Route path="/signin" render={props => <Signin {...props} />} />
        <Route path="/users" render={props => <Users {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
