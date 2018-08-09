import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import {Route} from 'react-router-dom';
import Users from './components/users';
import Signin from './components/login';
import Signup from './components/register'
import {Link} from 'react-router-dom';

class App extends Component {
  constructor(){
    super()
    this.state = {
      users:[],
      

    }
  }

  logoutHandler = event => {
    localStorage.removeItem('jwt');
  }

  handleSetData = data => {
    this.setState({smurfs:data});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className='buttons'>
          <Link to='/signin'>
          <button className='red'>Sign In</button>
          </Link>
          <Link to='/signup'>
          <button className='blue'>Register</button>
          </Link>
          <Link to ='/users'>
          <button className='green'>Users</button>
          </Link>
        </div>
        <h1>
          JSON WEB TOKENS
        </h1>
         

        </header>
        <div>
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/users' component={Users} />
          <div>
            
          </div>

        </div>
        
        
        
      </div>
    );
  }
}

export default App;
