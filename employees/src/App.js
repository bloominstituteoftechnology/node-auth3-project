import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn'
import './App.css';
import {Route} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
   
          <h1 className="App-title">Welcome to React</h1>
        </header>
        

        <Route path='/signin' component={SignIn}/>

         {/* <Route path='login' component={}/> */}
      </div>
    );
  }
}

export default App;
