import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, NavLink } from "react-router-dom";
import UserList from './components/UserList';
import Login from './components/Login';
import Register from './components/Register';

const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

 class App extends React.Component {
   
  handleLogout(){
    localStorage.removeItem('jwt');
    this.props.history.replace('/');
  }
   
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to = '/' exact>Home</NavLink>
            <NavLink to = '/users'>Users</NavLink>
            <NavLink to = '/login'>Login</NavLink>
            <NavLink to ='/register'>Register</NavLink>
            <NavLink to = '/' exact onClick={this.handleLogout}>Logout
            </NavLink>
          </nav>
        </header>
        <main>
          <Route exact path = '/' component = {Home} />
          <Route path = '/users' render = {(props) => {
            return <UserList/>
          }}/>
          <Route path = '/login' component = {Login} />
          <Route path = '/register' component = {Register} />
        </main>
      </div>
    );
  }
}

 export default App;