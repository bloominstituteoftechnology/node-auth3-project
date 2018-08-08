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
      

    }
  }

  componentWillMount() {
    this.regiSter();
    
  }

  
  logIn = () => {
    axios
        .get('http://localhost:3300/api/login')
        .then((response) => {
          this.setState({ login: response.data })
        })
        .catch(err => console.log(err));
  }

  regiSter = () => {
    axios
        .get('http://localhost:3300/api/register')
        .then((response) => {
          this.setState({ register: response.data })
        })
        .catch(err => console.log(err));
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
