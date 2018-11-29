import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';

import './App.css';

const url = process.env.REACT_APP_API_URL;



class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: false,
      users: [],    
    };
  }

  authenticate = () => {
    const token = localStorage.getItem('my_little_token');
    const options = {
      headers: {
        authentication: token,
      },
    };

    if(token) {
      axios.get(`${url}/api/users`, options)
        .then((res) => {
          console.log(res);
          if(res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
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
    console.log(this.props);
    console.log(prevProps);
    if(pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }


  render() {
    return (
      <div className="App">
        <h1>Steve's Front End</h1>
        <nav>
          <NavLink to='/' className="nav-link">Home</NavLink>
          <NavLink to='/login' className="nav-link">Login</NavLink>
          <NavLink to='/register' className="nav-link">Register</NavLink>          
        </nav>
        <section>
          <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/' render={() => {
              return(
                <React.Fragment>
                  <h2>Users</h2>
                  <div>
                    {this.state.users.map(user => <p key={user.id} className="list-item">{user.id}. {user.username}</p>)}
                  </div>
                </React.Fragment>
              );
            }} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
