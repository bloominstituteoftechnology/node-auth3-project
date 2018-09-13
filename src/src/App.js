import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import Register from './components/register'
import Home from './components/users'
import Login from './components/login'
import Header from './components/header'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
    }
  }

  render() {
    return (
      <div className="App">
        <AppDiv>
          <Route path="/" render={(props) => {
            return (<Header {...props} />)}} />
          <div className="main">
            <Route path="/register" render={(props) => {
              return (<Register {...props} imputHandler={this.inputHandler} />)}} />
            <Route path="/login" render={(props) => {
              return (<Login {...props} imputHandler={this.inputHandler} />)}} />
            <Route path="/users" render={(props) => {
              return (<Home {...props} />)}} />
            <Route exact path="/" render={(props) => {
              return (<div>Hello, use the links above to sign in or register </div>)}} />
          </div>  
        </AppDiv>
      </div>
    );
  }
}

export default withRouter(App);

const AppDiv = styled.div`

  display: flex;
  flex-direction: column;
  .main{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
  }
  .header { 
    background: lightgray;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    a {
      text-decoration: none; 
    }
  }
  form{ 
    display: flex;
    flex-direction: column
  }
`;