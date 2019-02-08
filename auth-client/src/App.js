import React, { Component } from 'react';
import {Route, NavLink, Switch} from 'react-router-dom'
import './App.css';
import Users from './users/Users'
import Signup from './auth/Signup';
import Signin from './auth/Signin'



class App extends Component {

  handleButton = () => {
    localStorage.removeItem('jwt')
  }

  render() {
    return (
      <div className="App">
        <div>
          <header>
            <nav>
              <NavLink to='/signup'>Signup</NavLink>
            &nbsp;|&nbsp;              
              <NavLink to='/signin'>Signin</NavLink>
            &nbsp;|&nbsp;
              <NavLink to='/users'>Users</NavLink>
              <div>
            &nbsp;|&nbsp;
              <button onClick={this.handleButton}>Sign out</button>
            </div>
            </nav>
          </header>
          <main>
            <Route path='/signup' component={Signup}/>
            <Route path='/signin' component={Signin}/>
            <Route path='/users' component={Users}/>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
