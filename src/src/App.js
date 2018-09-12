import React, { Component } from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import './App.css';
import Register from './components/register'

class App extends Component {
  
  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div className="App">
        <AppDiv>
          <Route path="/register" render={() => {
            return (<Register imputHandler={this.inputHandler} />)}} />
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