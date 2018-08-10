import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn'
import UserList from './components/Users/UserList'
import './App.css';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
   
          <h1 className="App-title">Welcome to React</h1>
        </header>


        <Route path='/signin' component={SignIn}/>

         <Route path='/users' component={UserList}/>
        
      </div>
    );
  }
}

export default App;
