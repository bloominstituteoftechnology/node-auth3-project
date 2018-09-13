import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Signup } from "./components/signup/Signup.js";
import { Signin } from "./components/signin/Signin.js";
import { UsersList } from "./components/usersList/UsersList.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/users" component={UsersList} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
