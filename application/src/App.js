import React, { Component } from 'react';
import axios from 'axios';
import {withRouter,Switch,NavLink,Route} from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';

const url = 'http://localhost:9000'



class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      users: []
    }
  }

  componentDidMount(){}

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

export default App;
