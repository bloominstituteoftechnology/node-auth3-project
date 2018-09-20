import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';

import SignIn from './ClientRoutes/SignIn';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={SignIn} />
      </div>
    );
  }
}

export default withRouter(App);
