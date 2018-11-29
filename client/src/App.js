import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";

import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

const Home = props => {
  if (props.loggedIn) {
    return (
      <ul>
        {props.users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    );
  } else {
    return <h1>Home</h1>;
  }
};

class App extends Component {
  state = {
    loggedIn: false,
    users: []
  };

  authenticate = () => {
    const url = "http://localhost:3000/api/users";
    const token = localStorage.getItem("jwtToken");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .get(url, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => this.props.history.push("/login"));
    } else {
      this.props.history.push("/login");
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    console.log(this.props);
    console.log(prevProps);
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to="/" activeStyle={{ textDecoration: "underline" }}>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink
              to="/register"
              activeStyle={{ textDecoration: "underline" }}
            >
              Register
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login" activeStyle={{ textDecoration: "underline" }}>
              Login
            </NavLink>
          </nav>
        </header>
        <section>
          <Switch>
            <Route
              exact
              path="/"
              render={ownProps => (
                <Home
                  {...ownProps}
                  loggedIn={this.state.loggedIn}
                  users={this.state.users}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
// export default App;
