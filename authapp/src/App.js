import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import Users from './users/Users';
import LogIn from './authentication/LogIn';
import SignUp from './authentication/SignUp';
import './App.css';

const Home = props => {
  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login">Log In</NavLink>
            &nbsp; |&nbsp;
            <NavLink to='/register'>Sign Up</NavLink>
            &nbsp;|&nbsp;
          </nav>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/users" component={Users} />
            <Route path="/login" component={LogIn} />
            <Route path='/register' component={SignUp} />
          </main>
          <button onClick={this.logOut}>Log Out</button>
        </header>
      </div>
    );
  }

  logOut = () => {
    localStorage.removeItem('jwt');
  };

}

export default App;
