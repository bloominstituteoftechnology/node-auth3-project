import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import RegisterLoginForm from './components/RegisterLoginForm';
import UserList from './components/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />          
        </header>        
        <Route path="/signin" component={RegisterLoginForm}/>
        <Route path="/signup" component={RegisterLoginForm}/> 
        <Route path="/users" component={UserList}/>
      </div>
    );
  }
}

export default App;
