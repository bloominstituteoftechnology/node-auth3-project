import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';


import Register from './components/register'
import Home from './components/users'
import Login from './components/login'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
    }
  }

  render(props) {
    return (
      <div className="App">
        <AppDiv>
          <div className="header">
            <h1>Authorization App</h1>
          </div>
          <Route path="/start" render={(props) => {
            return (<Register {...props} imputHandler={this.inputHandler} />)}} />
          <Route path="/start" render={(props) => {
            return (<Login {...props} imputHandler={this.inputHandler} />)}} />
          <Route path="/users" render={(props) => {
            return (<Home {...props} />)}} />
        </AppDiv>
      </div>
    );
  }
}

export default withRouter(App);

const AppDiv = styled.div`
  border: 1px solid red;
  background: gray;
  width: 100vw;
  height: 100vh;
  .header { 
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    button {
      height: 50%;
    }
  }
`;