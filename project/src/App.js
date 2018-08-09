import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Users from './components/users';
import Signin from './components/login';
import Signup from './components/register'

class App extends Component {
  constructor(){
    super()
    this.state = {
      users:[],
      

    }
  }

  handleSetData = data => {
    this.setState({smurfs:data});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>
          JSON WEB TOKENS
        </h1>
         

        </header>
        <div>
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/users' component={Users} />

        </div>
        
        
        
      </div>
    );
  }
}

export default App;
