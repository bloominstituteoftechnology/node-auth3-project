import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LogInContainer from './containers/LogInContainer';
import SignUpContainer from './containers/SignUpContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LogInContainer} />
          <Route exact path="/signup" component={SignUpContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
