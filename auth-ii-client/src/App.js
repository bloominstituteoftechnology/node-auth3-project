import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import LogIn from './components/LogIn';
import Users from './components/Users';
import Register from './components/Register';

class App extends Component {
  
  render() {
    return (
      <div className="App">
      <Route path="/signup" component={Register} />
      <Route path="/login" component={LogIn} />
      <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
