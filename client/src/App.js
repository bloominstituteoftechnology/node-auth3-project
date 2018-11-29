import React, { Component } from "react";
import axios from "axios";
import { withRouter, Switch, Route, NavLink } from "react-router-dom";

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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              path="/"
              render={() => {
                return (
                  <React.Fragment>
                    <h2>User</h2>
                    <ol>
                      {this.state.users.map(user => (
                        <li key={user.id}>{user.username}</li>
                      ))}
                    </ol>
                  </React.Fragment>
                );
              }}
            />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
