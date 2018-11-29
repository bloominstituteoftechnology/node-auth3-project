import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Signup from "./components/Signup.js";
import Login from "./components/Login";
import { StyledLink, StyleBtn, NavBar } from './Styles.js';

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
    const token = localStorage.getItem("secret_token_key");
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

  signOut = () => {
    localStorage.removeItem("secret_token_key");
    this.props.history.push("/login");
  };

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate = prevProps => {
    const { pathname } = this.props.location;
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  };

  render() {
    return (
      <div className="App">
        <NavBar>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/signup">SignUp</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
          <StyleBtn onClick={this.signOut}>Sign Out</StyleBtn>
        </NavBar>
        <section>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route
              path="/"
              render={() => {
                return (
                  <React.Fragment>
                    <h2>Users</h2>
                    <div>
                      {this.state.users.map(user => (
                        <div>
                          <h3 key={user.id}>Name: {user.username} | Department: {user.department}</h3>
                        </div>
                      ))}
                    </div>
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
