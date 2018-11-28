import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {}
  render() {
    return <div className="App" />;
  }
}

export default App;
