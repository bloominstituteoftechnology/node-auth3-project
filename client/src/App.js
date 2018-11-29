import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Register, Login, UserList, NavBar, Welcome } from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
        <section>
        <Route exact path='/' component={Welcome} />
        <Switch>
        <Route path='/home' component={UserList} />
        <Route path='/signup' component={Register} />
        <Route path='/signin' component={Login} />
        </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
