import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/containers/Home';
import Users from './components/containers/Users';
import Register from './components/forms/authentication/Register';
import Login from './components/forms/authentication/Login';

import logo from './logo.svg';
import './App.css';

//<Route path="/users/:id" render={props => <UserInfo {...props} /> } />

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <section>
              <NavLink to="/users"></NavLink>
            </section>
            <section>
              <div>
                <NavLink to="/"><img src={logo} className="App-logo" alt="logo" /></NavLink>
              </div>
              <div>
                <h1 className="App-title">Welcome to React</h1>
              </div>
            </section>
            <section>
              <NavLink to="/users/:id"></NavLink>
            </section>
          </header>

          {/*Routes*/}
          <Route exact path="/" render={props => 
            <Home 
              {...props} 
              roles={this.props.roles} 
              isRolesFetching={this.props.isRolesFetching}
              isUserFetching={this.props.isUserFetching}
            /> }
          />
          <Route path="/register" render={props => <Register {...props} roles={this.props.roles} /> } />
          <Route path="/login" render={props => <Login {...props} /> } />
          <Route exact path="/users" render={props => <Users {...props} users={this.props.users} /> } />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.roles,
  isRolesFetching: state.isRolesFetching,
  users: state.users,
  isUserFetching: state.isUserFetching
});

export default connect(mapStateToProps, {})(App);
