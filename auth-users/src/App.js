import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Users from './components/Users';
import styled from 'styled-components';
import './App.css';

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  > * {
    color: white;
    text-decoration: none;
    padding: 1rem;
    font-weight: 800;
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </Nav>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/users" component={Users} />
        <button onClick={this.logoutHandler}>Logout</button>
      </div>
    );
  }
  logoutHandler = e => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin')
  }
}

export default withRouter(App);
