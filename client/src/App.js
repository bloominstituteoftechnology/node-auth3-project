import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import UserList from './components/UserList';
import Login from './components/Login';
import Register from './components/Register';


const Application = styled.div`


`


class App extends Component {
  render() {
    return (
      <Router>
      <Application>
        <Switch>
          <Route path='/users' component={UserList} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          
          <Redirect to='/users' />
        </Switch>
      </Application>
      </Router>
    );
  }
}

export default App;
