import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Login from './login/sign_in';
// import Signup from './components/sign_up';
import Users from './users/user_list';

class App extends Component {
  render() {
    return (
      <>
      <div className="App">
        <header> 
          <nav>
            <NavLink to="/login">Login</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.logout}>Logout</button>
            <NavLink to="/users">Users</NavLink>
          </nav>
        </header>
        <main>
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </div>
      </>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/login')
  }
}


export default withRouter(App);