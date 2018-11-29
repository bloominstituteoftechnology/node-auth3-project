
import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import LandingPage from './components/LandingPage'
import axios from "axios";
 class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loggedIn: false,
      credentials: {
        username: "",
        password: "",
        department:""
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
        axios
        .get('http://localhost:9000/api/users')
        .then(res => { this.setState({users: res.data})})
      })
      .catch(err => console.log(`There was an error: ${err}`))
  };
   registerEvent = ev => {
    ev.preventDefault();
    if (
      this.state.credentials.username === "" &&
      this.state.credentials.password === "" &&
      this.state.credentials.department === ""
    ) {
      return alert("Please enter a username, password and department.");
    }
    axios.post("http://localhost:9000/api/register", this.state.credentials)
    .catch(err => console.log(`There was an error: ${err}`))
  };
   getUsers = ev => {
    ev.preventDefault();
    axios.get("http://localhost:9000/api/users").then(res => {
      this.setState({ users: res.data });
    });
  };
   render() {
    return (
      <div className="App">
        <Route
          path="/sign-in"
          render={props => (
            <LoginPage
              {...props}
              inputHandler={this.inputHandler}
              loginEvent={this.loginEvent}
            />
          )}
        />
        <Route
          path="/sign-up"
          render={props => (
            <RegisterPage
              {...props}
              inputHandler={this.inputHandler}
              registerEvent={this.registerEvent}
            />
          )}
        />
        <Route 
        path='/'
        render={props => (
          <LandingPage 
            {...props}
          />
        )}
        />
      </div>
    );
  }
}
 export default App;