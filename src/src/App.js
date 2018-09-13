import React, { Component } from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import './App.css';
import Register from './components/register'
import Home from './components/home'

class App extends Component {
  
  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div className="App">
        <AppDiv>APP
          <Route path="/register" render={(props) => {
            return (<Register {...props} imputHandler={this.inputHandler} />)}} />
          <Route path="/welcome" render={(props) => {
            return (<Home {...props} />)
          }} />
        </AppDiv>
      </div>
    );
  }
}

export default App;

const AppDiv = styled.div`
  border: 1px solid red;
  background: gray;
  width: 100vw;
  height: 100vh;
`;