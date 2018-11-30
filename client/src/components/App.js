import React, { Component } from 'react'
import axios from 'axios'
import Register from './Signup'
import Login from './Signin'
import Users from './Users'
import Greeting from './Greeting'
import { withRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom'

class App extends Component {
  state = {
    loggedIn: false,
    users: []
  }

  // check for token, send token to server, get users, set loggedIn to true
  authenticate = () => {
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        authorization: token
      }
    }

    if (token) {
      axios
        .get(`http://localhost:3300/api/users`, options)
        .then(res => this.setState({ loggedIn: true, users: res.data }))
        .catch(err => console.log(err))
    }
  }

  // destroy token, set state to logged out
  signout = () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
    this.props.history.push('/')
  }

  // make first api call when component mounts
  componentDidMount() {
    this.authenticate()
  }

  // if we move around the app we need to make sure that our
  // users content stays fresh. to do so when look for changes
  // in the history object and reauthenticate accordingly
  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location

    if (
      (pathname === '/' || pathname === '/users') &&
      pathname !== prevProps.location.pathname
    ) {
      this.authenticate()
    }
  }

  render() {
    const { loggedIn } = this.state

    return (
      <div className="App">
        <nav>
          <NavLink to="/signin">Login</NavLink>
          <NavLink to="/signup">Register</NavLink>
          <button onClick={this.signout}>sign out</button>
        </nav>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
            <Route
              path="/users"
              render={() => <Users users={this.state.users} />}
            />

            {/* if user is not logged in display greeting
                otherwise display users list */}
            <Route
              exact
              path="/"
              render={() =>
                loggedIn ? <Redirect to="/users" /> : <Greeting />
              }
            />
          </Switch>
        </section>
      </div>
    )
  }
}

export default withRouter(App)
