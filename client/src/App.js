import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withRouter, Route } from "react-router-dom";
import axios from "axios";
axios.credentials = true;

class App extends Component {
  state = {
    username: "",
    password: "",
    department: "",
    isLogged: false,
    users: []
  };

  handleInput = event => {
    if (!event.target.name) throw new Error("Event target name is not given");

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    if (!event.target.name) throw new Error("Event target name is not given");
    const { data } = await axios.post(
      `http://localhost:3000/${event.target.name}`,
      {
        username: this.state.username,
        password: this.state.password,
        department: this.state.department
      }
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      await this.getUserData(data.token);
      this.state.users.length > 0
        ? this.setState({
            isLogged: true
          })
        : null;
    }
  };

  getUserData = async token => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      };

      const { data } = await axios.get("http://localhost:3000/users", {
        headers
      });
      if (data)
        this.setState({
          users: data
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default withRouter(App);
