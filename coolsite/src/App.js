import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/login";
import Users from "./components/users";
import Register from "./components/register";



class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  
  render() {
    return (
      <div className="App">

        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/register" component={Register}/>
      </div>
    );
  }
}

export default App;
