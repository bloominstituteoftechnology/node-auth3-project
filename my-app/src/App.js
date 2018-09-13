import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";

import "./App.css";
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
        <Route exact path="/signup" render={props => <Signup {...props} />} />
        <Route exact path="/signin" render={props => <Signin {...props} />} />
        <Route exact path="/users" render={props => <Users {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
