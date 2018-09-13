import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './views/LoginView';
import './App.css';
const URL_LOGIN = 'http://localhost:8080/api/login';
const URL_USERS = 'http://localhost:8080/api/users';

class App extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount(){

  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log(`logging typing: ${e.target.value}`);
  }


  render() {
    return (
      <div className="App">
        <Route path="/login" render={(props) => { return <Login {...props} login={this.handleLogin} loginInfo={this.state}/>}}></Route>
      </div>
    );
  }
}

export default App;
