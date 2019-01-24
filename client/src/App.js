import React, { Component } from 'react';
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout } from './store/actions/authActions';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
   render() {
      return (
         <BrowserRouter>
            <div className="app">
               <NavLink to="/">Home</NavLink>
               <NavLink to="/login">Login</NavLink>
               <NavLink to="/signup">Sign Up</NavLink>
               <NavLink to="/login" onClick={this.props.logout}>
                  Sign Out
               </NavLink>

               <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
               </Switch>
            </div>
         </BrowserRouter>
      );
   }
}

export default connect(
   null,
   { logout }
)(App);
