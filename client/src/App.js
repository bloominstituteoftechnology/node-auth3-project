import React, { Component } from 'react';
import './App.css';
import {withRouter,Route} from 'react-router-dom';
import SignUp from './components/signUp';
import UserList from './components/userList.js';

class App extends Component {
  componentDidMount() {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className="App">
       <Route exact path='/signup' component={SignUp}/>
       <Route exact path='/users' component={UserList}/>
      </div>
    );
  }
}

export default withRouter(App);
