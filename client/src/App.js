import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import Login from './components/Login';
import Register from './components/Register';


class App extends Component {
  render() {
    return (
      <Router>
      <div className='App'>
        <Switch>
          <Route path='/users' component={UserList} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Redirect to='/users' />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
