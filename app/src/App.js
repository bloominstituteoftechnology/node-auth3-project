import React, { Component } from "react";
import { withRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";

const url = process.env.REACT_APP_API_URL;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    };
  }
  authenticate = () => {
    const token = localStorage.getItem("jwtToken");
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
          this.props.history.push("/login");
        });
    } else {
      this.props.history.push("/login");
    }
  };
  componentDidMount() {
    this.authenticate();
  }
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
          <h2>Users</h2>
          <ol>
            {this.state.users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ol>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
