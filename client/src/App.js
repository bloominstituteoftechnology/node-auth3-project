import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

// import Routes
import SignUpPg from './components/SignUpPg';
import LogInPg from './components/LogInPg';
import UsersListPg from './components/UsersListPg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usersList: []
    }
  }

  render() {
    return (
      <div className="App">
        < Route path='/api/signup' component={SignUpPg} />
        < Route path='/api/login' component={LogInPg} />
        < Route path='/api/users' component={UsersListPg} />
      </div>
    );
  }
}

export default App;
