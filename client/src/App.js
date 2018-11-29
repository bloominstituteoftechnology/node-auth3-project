import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props)= {
    loggedIn: false,
    users: [],
  }
}
}

return (
  //<SWITCH> Only the first child to match the current location will be rendered.
  //<REACT.FRAGMENT> Fragments let you group a list of children without adding extra nodes to the DOM.
  //... using fragments results in a correct <Table /> output 

  <div className="App">
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
    <section> 
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" render={() => {
          return (
            <React.Fragment>
            <h2>Users</h2>
              <ol>
                {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
              </ol>
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
