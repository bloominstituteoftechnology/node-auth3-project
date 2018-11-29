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

  authenticate = () => {
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        authorization: token
      }
    }

    console.log(token)

    if (token) {
      axios
        .get(`http://localhost:3300/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data })
          } else {
            throw new Error()
          }
        })
        .catch(err => {
          console.log(err)
          // do nothing
          // this.props.history.push('/login')
        })
    } else {
      // do nothing
      // this.props.history.push('/login')
    }
  }

  componentDidMount() {
    this.authenticate()
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location

    if (pathname === '/' && pathname !== prevProps.location.pathname) {
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
        </nav>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
            <Route
              path="/users"
              render={() => <Users users={this.state.users} />}
            />

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
