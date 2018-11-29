import React, { Component } from "react";

import axios from "axios";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    //TODO: get list of users from server, set on state
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={ownProps => <LoginOrRegister {...ownProps} />}
        />
        <Route
          exact
          path="/signup"
          render={ownProps => <SignUp {...ownProps} />}
        />
        <Route
          exact
          path="/signin"
          render={ownProps => <SignIn {...ownProps} />}
        />
        <Route
          exact
          path="users"
          render={ownProps => (
            <UserList {...ownProps} users={this.state.users} />
          )}
        />
      </div>
    );
  }
}

export default App;
