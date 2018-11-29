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
      users: [],
      loggedIn: false
    };
  }
  componentDidMount() {
    this.authenticate();
  }
  authenticate = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        authentication: token
      }
    };
    if (token) {
      axios.get("http://localhost:9000/api/users", options).then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ loggedIn: true, users: res.data });
        }
      });
    } else {
      this.props.history.push("/sign-in");
    }
  };
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

export default withRouter(App);
