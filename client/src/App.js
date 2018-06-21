import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.css';
import Login from './Login';
import UserList from './UserList';
import Register from './Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/users' component={UserList}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
