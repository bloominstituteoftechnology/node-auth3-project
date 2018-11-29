import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

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
    const token = localStorage.getItem('secret_bitcoin_token');
    const options = {
      headers: {
        authentication: token,
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
      })
    }
  }

  componentDidMount(){
    this.authenticate();
  }

  render() {
    return (
      <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      <Switch>
        <Route path ='/register' component={Register}/>
        <Route path ='/login' component={Login}/>
      </Switch>
      <ol>
        {this.state.users.map(user => <li key={user.id}>user.username</li>)}
      </ol>

      </div>
    );
  }
}

export default App;
