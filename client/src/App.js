import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import RegisterLoginForm from './components/RegisterLoginForm';
import UserList from './components/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signin" component={RegisterLoginForm}/>
        <Route path="/signup" component={RegisterLoginForm}/> 
        <Route path="/users" component={UserList}/>
      </div>
    );
  }
}

export default App;
