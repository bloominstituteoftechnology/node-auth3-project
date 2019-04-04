import React, { Component } from 'react';
import './App.css';
import {withRouter, Route, NavLink} from 'react-router-dom';
import Login from './components/login/Login.js'
class App extends Component {
  constructor(props){
    super();
    this.state={
      username: '',
      password: ''

    };
  }
  render() {
    return (
    <>
      <header>
        <NavLink to='/'> Home </NavLink>
        &nbsp;|&nbsp;
        <NavLink to ='/login'> Login </NavLink>
        &nbsp;|&nbsp;
        <button onClick={this.logout}> Logout </button>
      </header>

      <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Login} />
      </main>
      
    </>
    );
  }

  logout = e => {
    window.localStorage.removeItem('token');
    this.props.history.push('/login');
  };
  
}
function Home(props) {
  return <h1> </h1>;
}


export default withRouter(App);
