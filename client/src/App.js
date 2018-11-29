import React, { Component } from "react";
import "./App.css";
import { Route, withRouter, Switch, NavLink } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import LandingPage from "./components/LandingPage.js";
import UserListPage from "./components/UserListPage.js";
import axios from "axios";

const token = localStorage.getItem("login_token");
const options = {
  headers: {
    authorization: token
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedIn: false,
      credentials: {
        username: "",
        password: "",
        department: ""
      }
    };
  }

  inputHandler = ev => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [ev.target.name]: ev.target.value
      }
    });
  };

  loginEvent = ev => {
    ev.preventDefault();
    if (
      this.state.credentials.username === "" ||
      this.state.credentials.password === ""
    ) {
      return alert("Please enter a username and password.");
    }
    axios
      .post("http://localhost:9000/api/login", this.state.credentials)
      .then(res => {
        if (res.status === 200 && res.data.token) {
          localStorage.setItem("login_token", res.data.token);
        }
        axios.get("http://localhost:9000/api/users", options).then(res => {
          this.setState({ users: res.data, loggedIn: true });
          this.props.history.push("/userlist");
          if(this.state.loggedIn === true) {
            alert('Log In Successful.')
          }
        });
      })
      .catch(err => console.log(`There was an error: ${err}`));
  };

  registerEvent = ev => {
    ev.preventDefault();
    if (
      this.state.credentials.username === "" ||
      this.state.credentials.password === "" ||
      this.state.credentials.department === ""
    ) {
      return alert("Please enter a username, password and department.");
    }
    axios
      .post("http://localhost:9000/api/register", this.state.credentials)
      .then(res => {
        this.setState({
          username: '',
          password: '',
          department: ''
        })
        if(res.status === 201) {
          alert('New user has been successfully registered.')
        }
      })
      .catch(err => console.log(`There was an error: ${err}`));
  };

  logOut = ev => {
    ev.preventDefault();
    localStorage.removeItem("login_token");
    this.setState({ loggedIn: false, users: [] });
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <nav className="navBar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/sign-in">Log In</NavLink>
          <NavLink to="/sign-up">Register</NavLink>
          <NavLink to="/userlist">UserList</NavLink>
          {this.state.loggedIn === false ? (
            undefined
          ) : (
            <button className="logoutButton" onClick={this.logOut}>
              Logout
            </button>
          )}
        </nav>

        <Switch>
          <Route
            path="/sign-in"
            render={props =>
              this.state.loggedIn === false ? (
                <LoginPage
                  {...props}
                  inputHandler={this.inputHandler}
                  loginEvent={this.loginEvent}
                  loggedIn={this.state.loggedIn}
                />
              ) : (
                <h1>You're already logged in.</h1>
              )
            }
          />
          <Route
            path="/sign-up"
            render={props => (
              <RegisterPage
                {...props}
                inputHandler={this.inputHandler}
                registerEvent={this.registerEvent}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={props => (
              <LandingPage 
              {...props} 
              loggedIn={this.state.loggedIn} 
              />
            )}
          />
          <Route
            path="/userlist"
            render={props => (
              <UserListPage
                {...props}
                users={this.state.users}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
