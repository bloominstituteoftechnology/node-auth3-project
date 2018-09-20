import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';

import SignIn from './ClientRoutes/SignIn';
import SignUp from './ClientRoutes/SignUp';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
    );
  }
}

export default withRouter(App);
