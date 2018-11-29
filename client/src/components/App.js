import React, { Component } from 'react'
import axios from 'axios'
import Register from './Signup'
import Login from './Signin'
import Users from './Users'
import Greeting from '/Greeting'
import { withRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom'

const url = process.env.REACT_APP_API_URL

class App extends Component {
  state = {
    loggedIn: false
  }

  authenticate = () => {
    const token = localStorage.getItem('secret_bitcoin_token')
    const options = {
      headers: {
        authentication: token
      }
    }

    if (token) {
      axios
        .get(`${url}/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data })
          } else {
            throw new Error()
          }
        })
        .catch(err => {
          this.props.history.push('/login')
        })
    } else {
      this.props.history.push('/login')
    }
  }

  componentDidMount() {
    this.authenticate()
  }

  componentDidUpdate(prevProps) {
    const { loggedIn } = this.state
    const { pathname } = this.props.location

    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate()
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
            <Route path="/users" component={Users} />

            <Route
              exact
              path="/"
              render={() =>
                loggedIn ? <Greeting /> : <Redirect to="/users" />
              }
            />
          </Switch>
        </section>
      </div>
    )
  }
}

export default withRouter(App)
