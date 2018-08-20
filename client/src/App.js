import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { SignUp, Login, UsersList  } from './components';


class App extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to lambda School Authentication project</h1>
          </header>
          <h3 className="App-intro">
            login to view users
          </h3>
            <div className = 'navigation'>
              <Link to ='/login'>
                <div><button className ='button'>login</button></div>
              </Link>
              <Link to ='/register'>
                <div><button className ='button'>register</button></div>
              </Link>
              <div><Link to='/login'><button className ='button' name='logout' onClick = {this.handleLogout} >logout</button></Link></div>
            </div>
          
          <Route path = '/register' component = {SignUp} />
          <Route path = '/login' component ={Login}/>
          <Route path = '/users' component ={UsersList}/>
      </div>
    );
  }
  handleLogout = (event) => {
    if(event.target.name === "logout"){
      localStorage.removeItem('token')
    }
  }
}

export default App;


