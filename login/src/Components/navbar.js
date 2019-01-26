import React, { Component } from 'react';
import '../App.css';
import {NavLink, Route} from 'react-router-dom';
import Register from './register';
import Home from './home';
import Login from './login';
import Users from './users';
import { withRouter } from 'react-router';

class NavBar extends Component {
  render() {
    return (
    <header className="App-header">
        <nav>
          <NavLink exact to='/' className="navlink" activeClassName="current">Home</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/register' className="navlink" activeClassName="current">Register</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/login' className="navlink" activeClassName="current">Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/users' className="navlink" activeClassName="current">Users</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/' onClick={this.signout} className="navlink" >Logout</NavLink>
        </nav>

        <Route exact path='/' component={Home} />
        <Route path='/register' render={ props => <Register {...props} /> } />
        <Route path='/login' render={ props => <Login {...props} /> } />
        <Route path='/users' render={ props => <Users {...props} /> } />
    </header>
    );
  }

  signout = () => {
      localStorage.removeItem('jwt');
      this.props.history.push('/');
  }
}

export default withRouter(NavBar);
