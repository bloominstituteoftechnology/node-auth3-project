import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Forms from './auth/Forms';
import Users from './users/Users';


import './App.css';

class App extends Component {

  logout = () => { 
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt')
      this.props.history.push('/signin')
    }
  }
  render() {
    return (
      <div className="App">
        <Route path='/forms' component={Forms} />  
        <Route path='/users' component={Users} />
        
          
      </div>
    );
  }
}

export default App;
