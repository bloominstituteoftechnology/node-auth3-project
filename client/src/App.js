import React, { Component } from 'react';
import './App.css';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom'

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
              <Route path='/signup' component={SignUp} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
