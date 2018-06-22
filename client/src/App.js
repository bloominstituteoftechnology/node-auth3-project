import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import UserList from './components/UserList/UserList';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/register' component={SignUp} />
          <Route path='/users' component={UserList} />          
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
