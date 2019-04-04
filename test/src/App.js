import React, { Component } from 'react';
import './App.css';
import {withRouter, Route, NavLink, Switch, } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login/Login.js'
import Registration from './components/registration/Registration.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users: [],
      loggedIn: false,
    };
  }
  componentDidMount(){
    var token = localStorage.getItem(`token`)
    var request = {
      headers: { authorization : token }
    }
    if(token){
    const url = 'http://localhost:5000/api/users';
    axios
      .get(url, request)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(err => console.log(err));
      this.props.history.push('/login');
    }else{
      this.props.history.push('/login');
    }
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

      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Registration} />
          
      </Switch>
      
    </>
    );
  }

  logout = e => {
    window.localStorage.removeItem('token');
    this.setState({loggedIn:false});
    this.props.history.push('/login');
    
  };
  
}
function Home(props) {
  return <h1> </h1>;
}


export default withRouter(App);
