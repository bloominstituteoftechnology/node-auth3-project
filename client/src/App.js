import React, { Component } from "react";
import axios from "axios";
import { withRouter, Switch, Route, NavLink } from "react-router-dom";

import Users from "./components/Users";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedIn: false
    };
  }

  authenticate = () => {
    const token = localStorage.getItem("tolkien_token");
    const options = {
      headers: {
        authorization: token
      }
    };

    if (token) {
      axios
        .get(`${url}/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          this.props.history.push("/signin");
        });
    } else {
      this.props.history.push("/signin");
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Users</NavLink>
          <NavLink to="/signin">Login</NavLink>
          <NavLink to="/signup">Register</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
            <Route path="/" component={Users} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
