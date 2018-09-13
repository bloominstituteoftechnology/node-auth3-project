import React, { Component } from 'react';
import './App.css';
import Signin from './Sign in/Signin'; 
import {Route, withRouter} from 'react-router-dom'; 

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route path="/signin" render={props =>  <Signin {...props} />}/>
      </div>
    );
  }
}
  
export default withRouter(App);
