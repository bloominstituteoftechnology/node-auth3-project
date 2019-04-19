import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Login from './login/sign_in';
import Register from './register/sign_up';
import Users from './users/user_list';

class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
        <header> 
          <nav>
            <NavLink to="/Register">Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login">Login</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.logout}>Logout</button>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
          </nav>
        </header>
        <main>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </div>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/login')
  }
}


export default withRouter(App);