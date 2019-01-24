import React, { Component } from 'react';
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom';
import styled from 'styled-components';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
   render() {
      return (
         <BrowserRouter>
            <div className="app">
               <nav>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/signup">Sign Up</NavLink>
               </nav>
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

export default App;
