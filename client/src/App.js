import React, {Component} from 'react'
import {Route, Switch, NavLink, withRouter} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Users from './components/Users';

class App extends Component {
  render() {
    const token = localStorage.getItem('token');
    return (
      <div className="App">
  
        <nav>
          <NavLink to="/" >Home</NavLink>
          <NavLink to="/login" >Login</NavLink>
          <NavLink to="/signup" >Register</NavLink>
        </nav>
  
        <Switch>
          <Route exact path='/' render={(props) => (
            <Users {...props} />
          )} />
    
          <Route path='/signup' 
            render={(props) => (
              <Signup {...props} />
            )} 
          />
    
          <Route path='/login' 
            render={(props) => (
              <Login {...props} />
            )} 
          />
        </Switch>

        {token ? <button onClick={() => {localStorage.removeItem('token'); window.location.reload()}}>Logout</button> : null}

      </div>
    )
  }
}

export default withRouter(App);