import React, { Component } from 'react';
import './App.css';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
// import UsersList from './components/UsersList';
import LoginForm from './components/LoginForm';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      users: [],
    };
  }

  authenticate = () => {
    const token = (localStorage.getItem('my_token'));
    const options = {
      headers: {
        authorization: token,
      }, 
    };
   

  
    if(token) {
      axios.get(`${url}/api/users`, options)
      .then((res) => {
        if (res.status === 200 && res.data) {
          this.setState({loggedIn: true, users: res.data })
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.props.history.push('/login');
      });
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
    this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        </nav>
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route  exact path="/" render={() => {
            return(
              <React.Fragment>
                <h2>Users</h2>
                  <ol>
                    {this.state.users.map(user => <li key={user.id}>{user.username}: {user.department} {console.log(user.department)} </li>)}
                 </ol>
                 
              </React.Fragment>
            );
          }} />
          <Route path="/login" component={LoginForm} />
          </Switch>
          
        
      </div>
    );
  }
}

export default withRouter(App);
