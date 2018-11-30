import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';

document.body.classList.add('app-background');

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn: false,
      users: []
    }
  }

  authenticate = () => {
    const token = localStorage.getItem('secret_token');
    const options = {
      headers: {
        authorization: token,
      }
    }
    if (token) {
      //initiate login/authentication protocal
      axios.get(`${url}/api/users`, options)
      .then((res) => {
        if (res.status === 200 && res.data){
          this.setState({ loggedIn: true, users: res.data })
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/login');
      })
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount(){
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const {pathname} = this.props.location;
    console.log(this.props);
    console.log(prevProps);
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
      <nav>
        <NavLink to="/" className="navlink">Home</NavLink>
        <NavLink to="/login" className="navlink">Log In</NavLink>
        <NavLink to="/register" className="navlink">Register</NavLink>
      </nav>
      <Switch>
        <Route path ='/register' component={Register}/>
        <Route path ='/login' component={Login}/>
        <Route exact path ='/' render={() => {
          return (
            <React.Fragment>
              <h2>users</h2>
              <ol>
                {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
              </ol>
            </React.Fragment>
          );
        }}/>
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
