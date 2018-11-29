import React, { Component } from 'react';
import { NavLink, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'

const home = props => {
  return (
    <div>
    <h1>
    Home Component
    </h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div>
       <header>
        <nav>
          <NavLink to="/" exact>Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login" exact>Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/register" exact>Register</NavLink>
        </nav>
        <main>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={home} exact />
        </main>
       </header>
      </div>
    );
  }
}

export default App;