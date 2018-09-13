import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LogInContainer from './containers/LogInContainer';
import SignUpContainer from './containers/SignUpContainer';
import styled from 'styled-components';

const Wrap = styled.div`
  height: 100%;
  padding: 15px 30px;
  background: #f2f2f2;
`;

class App extends Component {
  render() {
    return (
      <Wrap>
        <Switch>
          <Route exact path="/login" component={LogInContainer} />
          <Route exact path="/signup" component={SignUpContainer} />
        </Switch>
      </Wrap>
    );
  }
}

export default App;
