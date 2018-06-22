import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../style/index.css';
import Login from '../components/Login';
import UserList from '../components/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/vip/users' component={UserList}/>
        </Switch>
      </div>
    );
  }
}

export default App;
