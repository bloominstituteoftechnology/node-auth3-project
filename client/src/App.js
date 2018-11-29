import React, { Component } from 'react';
import './App.css';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Users from './components/Users';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/signup'>SignUp</NavLink>
          <NavLink to='/signin'>Signin</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </nav>
        <section>
          <Switch>
              <Route path='/signup' component={Signup} />
              <Route path='/signin' component={Signin} />
              <Route paht='/users' component={Users} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
