import React, { Component } from 'react';
import './App.css';
import Signup from './Sign up/Signup'; 
import {Route, withRouter} from 'react-router-dom'; 
import Users from './Users/Users'; 

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path="/signin" render={props =>  <Signup {...props} />}/>
      <Route path="/users" render={props=><Users {...props}/>}/>
      </div>
    );
  }
}
export default withRouter(App);