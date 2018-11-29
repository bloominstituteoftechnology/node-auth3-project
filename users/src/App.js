import React, { Component } from 'react';
import axios from 'axios'
import { withRouter, Switch, Route, NavLink } from 'react-router-dom'
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { EventEmitter } from './events';

class App extends Component {
  constructor(props) {
    super(props)
    this.url = 'http://localhost:9000'
    this.state = {
      signedIn: false,
      users: []
    }
    EventEmitter.subscribe('signup', (newUser) => this.signUp(newUser))
    EventEmitter.subscribe('signin', (user) => this.signIn(user))
  }

  authenticate = () => {
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        authorization: token,
      },
    };

    if (token) {
      axios.get(`${this.url}/api/restricted/users`, options)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          }
          else {
            throw new Error();
          }
        })
        .catch((err) => {
          console.log(err)
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

  signUp = newUser => {
    axios.post(`${this.url}/api/register`, newUser)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data)
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
  
  signIn = user => {
    axios.post(`${this.url}/api/login`, user)
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          this.props.history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <div className='App'>
        <nav>
          <NavLink exact to='/'>Home</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
          <NavLink to='/signin'>Sign In</NavLink>
          {/* { this.state.loggedIn ? <div onClick={this.signout}>Sign Out</div> : <NavLink to='/signin'>Sign In</NavLink> } */}
        </nav>
        <section className='main-container'>
          <Switch>
            <Route exact path='/' render={ () => {
              return (
                <div className='users'>
                  {this.state.users.map(user => <div key={user.id}>{`User: ${user.username} Department: ${user.department}`}</div>)}
                </div>
              )
            }}/>
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
          </Switch>
        </section>
      </div>
    )
  }
}

export default withRouter(App);
