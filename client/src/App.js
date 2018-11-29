import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Register from './components/Register';
import Login from './components/login';
import {withRouter, NavLink, Switch, Route } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    }
  }

  authenticate = () => {
    const token = localStorage.getItem('secret_token');
    const options = {
      headers: {
        authentication: token
      }
    }

    if(token){
      axios.get(`${url}/api/users`, options)
      .then(response => {
        if(response.status === 200 && response.data){
          this.setState({ loggedIn: true, users: response.data});
        }else{
          throw new Error();
        }
      })
      .catch(error => {
        this.props.history.push('/login');
      })
    }else{
      this.props.history.push('/login')
    }
  }

  componentDidMount(){
    this.authenticate();
  }

  componentDidUpdate(prevProps){
    const { pathname } = this.props.location;
    console.log(this.props);
    console.log(prevProps);

    if(pathname === '/' && pathname !== prevProps.location.pathname){
      this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>register</NavLink>
        </nav>

        <section>
          <Switch>
            <Route path="/register" component={ Register }/>
            <Route path="/login" component={Login} />
            <Route path="/" render={() => {
              return(
                <React.Fragment>
                  <h1>Users</h1>
                  <div>
                    {this.state.users.map(user => <p key={user.id}>{user.username}</p>)}
                  </div>
                </React.Fragment>
              )
            }} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
