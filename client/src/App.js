import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
        </div>
      </Router>
    );
  }
}

export default App;
