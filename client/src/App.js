import React, {Component} from 'react'
import {Route, Switch, NavLink, withRouter} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import axios from 'axios';
import Users from './components/Users';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      users: null,
    }
  }

  authenticate = () => {
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        authorization: token,
      },
    }
    if (token) {
      axios.get(`http://localhost:9000/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({loggedIn: true, users: res.data})
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          this.props.history.push('/login')
        })
    } else {
      this.props.history.push('/login')
    }
  }

  componentDidMount = () => {
    this.authenticate();
  }
  
  componentDidUpdate = (prevProps) => {
    const {pathname} = this.props.history;
    if (pathname === '/' && pathname !== prevProps.history.pathname){
      this.authenticate();
    }
  }

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
            <Users {...props} users={this.state.users} />
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