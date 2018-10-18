import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { NavLink, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Home from './components/Home';
import UsersList from './components/UsersList';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

class App extends Component {
  // state = {
  //   users: [],
  //   username: ''
  // }

  userSignOut = () => {
    localStorage.removeItem('jwt');
  };

  // componentDidMount() {
  //   const token = localStorage.getItem('jwt');

  //   const options = {
  //     headers: {
  //       Authorization: token,
  //     },
  //   };

  //   axios
  //     .get(`http://localhost:4000/api/users`, options)
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({ users: response.data.users });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Authentication w/ JWTs
          </p>
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
            
            <span onClick={this.userSignOut}>Sign Out</span>
          </nav>
        </header>

        <main>
        <Route path="/" component={Home} exact />

        <Route
          path="/users"
          component={UsersList} />

        <Route
          path="/signup"
          component={SignUpForm}/>  


        <Route
          path="/signin"
          component={SignInForm}/>
        </main>
        
      </div>
    );
  }
}

export default withRouter(App);
