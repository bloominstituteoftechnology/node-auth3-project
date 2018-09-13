import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withRouter, Route } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import UsersList from "./components/UserList";
axios.credentials = true;

class App extends Component {
  state = {
    username: "",
    password: "",
    department: "",
    isLogged: false,
    users: []
  };

  componentDidMount(){
    const token = localStorage.getItem('jwt')
    if (token) this.getUserData(token)
  }

  handleInput = event => {
    if (!event.target.name) throw new Error("Event target name is not given");

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (!event.target.name) throw new Error("Event target name is not given");
    const { data } = await axios.post(
      `http://localhost:3000/${event.target.name}`,
      {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      }
    );
    console.log(data);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      await this.getUserData(data.token);
    } else if (data.status) {
      this.props.history.push("/");
    }
  };

  getUserData = async token => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token
      };

      const { data } = await axios.get("http://localhost:3000/users", {
        headers
      });
      if (data)
        this.setState({
          users: data,
          isLogged: true
        });
    } catch (err) {
      console.log(err);
    }
  };

  signOut = event => {
    event.preventDefault()
    localStorage.removeItem('jwt')
    this.setState({
      isLogged: false
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.isLogged ? (
          <UsersList users={this.state.users} signOut={this.signOut}/>
        ) : (
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <Login
                  {...props}
                  inputHandler={this.handleInput}
                  onSubmit={this.handleSubmit}
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={props => (
                <SignUp
                  {...props}
                  inputHandler={this.handleInput}
                  onSubmit={this.handleSubmit}
                />
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
