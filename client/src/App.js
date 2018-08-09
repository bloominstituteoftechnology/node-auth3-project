import React, { Component } from 'react';
import './App.css';
import SigninForm from './components/SigninForm';
import UserList from './components/UserList';
import SignupForm from './components/SignupForm';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/signin' component={SigninForm} />
            <Route path='/signup' component={SignupForm} />
            <Route path='/users' component={UserList} />
            <Redirect to='/signin' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
