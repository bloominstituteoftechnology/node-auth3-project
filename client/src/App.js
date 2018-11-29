import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import SignUp from './components/signup';
import SignIn from './components/signin';
import UserInfo from './components/users'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/register' component={SignUp}/>
        <Route exact path='/login' component={SignIn}/>
        <Route exact path='/users' component={UserInfo}/>
      </div>
    );
  }
}

export default App;
