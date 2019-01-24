import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/Users';
import Signin from './auth/Signin';
import SignUp from './auth/SignUp';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'vera',
      password: 'password'
    };
  }

  signout = event => {
    // could say if we have the item, remove it
    localStorage.removeItem('jwt');
  };

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/" exact>
            Home
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/users" exact>
            Users
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to="signin">Sign In</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="signup">Sign Up</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.signout}>Signout</button>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={SignUp} />
        </main>
      </div>
    );
  }
}

export default App;
