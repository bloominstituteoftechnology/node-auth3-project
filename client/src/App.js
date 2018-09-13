import React, { Component } from 'react';
import './App.css';
import {withRouter,Route} from 'react-router-dom';
import SignUp from './components/signUp';
import UserList from './components/userList';
import SignIn from './components/signIn'

class App extends Component {
  
  render() {
    return (
      <div className="App">
       <Route exact path='/signup' component={SignUp}/>
       <Route exact path='/users' component={UserList}/>
       <Route exact path='/signin' component={SignIn}/>
      </div>
    );
  }
}

export default withRouter(App);
