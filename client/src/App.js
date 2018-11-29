import React, { Component } from 'react';
import './App.css';

import axios from 'axios'
import Register from './components/Register';
import Login from './components/Login';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';





class App extends Component {
  render() {
    return (
      <div className="App">
             <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>

       <section>
          <Switch>
            <Route path="/register" component={Register} />
            {/* <Route path="/login" component={Login} />
            <Route path="/" render={() => {
              return (
                <React.Fragment>
                <h2>Users</h2>
                  <ol>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                  </ol>
                </React.Fragment>
              );
            }} /> */}
          </Switch>
          
        </section>
      </div>
    );
  }
}

export default withRouter(App);
