import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom' 
import Login from './Authorization/login.js'
import Register from './Authorization/register.js'
import Home from './Home/home.js'
import Users from './Users/users.js'
import './App.css';



class App extends Component {


    logout = () => {
      localStorage.removeItem('jwt')
      window.alert('now logged out')
      window.location.reload();
    }


  render() {
    return (
      <div className="App">
        <div onClick={this.logout} className='logout'>Logout</div>
        <nav> 
          <NavLink exact to='/' className='links'>Home</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/register' className='links'>Register</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/login' className='links'>Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/users' className='links'>Users</NavLink>
        </nav>
        <main>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/users' component={Users} />
        </main> 
      </div>
    );
  }
}

export default App;
