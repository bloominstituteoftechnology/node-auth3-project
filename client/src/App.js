import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';

import Signin from './components/Signin';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          
            <Route exact path='/signin' component={ Signin } ></Route>
            <Route exact path='/users' component={ Users } ></Route>
          

          { localStorage.getItem('jwt') && (<button onClick={this.logoutHandler}>Logout</button>)}
        </div>
      </div>
    );
  }
  logoutHandler = e =>{
    localStorage.removeItem('jwt');
    this.props.histry.push('/signin');
  }
}



export default withRouter(App);
