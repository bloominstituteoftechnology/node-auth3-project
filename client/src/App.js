import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import { withRouter, Switch, Route } from "react-router-dom";
import Users from "./components/Users";
import Signup from "./components/Signup";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:9000/api/users").then(res => {
      this.setState({ users: res.data });
    });
  }
  getUsers = () => {
    axios.get("http://localhost:9000/api/users").then(res => {
      this.setState({ users: res.data });
    });
  };
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/users"
            render={props => <Users {...props} users={this.state.users} />}
          />
          <Route
            exact
            path="/sign-up"
            render={props => <Signup {...props} getUsers={this.getUsers} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
