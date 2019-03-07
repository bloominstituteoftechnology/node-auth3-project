import React, { Component } from 'react';
import { Route,  withRouter } from 'react-router-dom';
import NavBar from './auth/NavBar'
import Login from './auth/login'


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <NavBar />
       <main>
          <Route path='/login' component={Login} />
          {/* <Route path='/users' component={Users} /> */}
        </main>
      </div>
    );
  }
}

export default App;
