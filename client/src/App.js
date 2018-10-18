import React, { Component } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Users from './Users/Users'
import Signin from './Auth/Signin'
import Signup from './Auth/Signup'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Authentication App</h1>
        <NavLink to="/" exact>Home</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/users">Users</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/signin">Signin</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/signup">Signup</NavLink>

        <Route path="/" component={Home} exact />
        <Route path="/users" component={Users} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" render={() => <Signup {...this.props} />} />

        <GlobalStyle />
      </div>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0;
    font-size: 62.5%;
    border: 1px solid black;
    text-align: center;
  }
  h1 {
    font-size: 3.2rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 2rem;
  }
  p, a, input, label, form {
    font-size: 1.6rem;
  }
`

export default withRouter(App)
