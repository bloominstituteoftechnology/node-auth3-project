import React, { Component } from 'react';
import {Route, NavLink} from "react-router-dom"
import './App.css'

import Users from './users/Users'

const Home = props => {
  return(
    <div>
      <h1>HOME</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <NavLink exact to ="/">Home</NavLink>
          <NavLink to ="/users">Users</NavLink>
        </nav>
        <main>
          <Route path ="/" component ={Home} exact></Route>
          <Route path ="/users" component ={Users}></Route>
        </main>
      </div>
    );
  }
}

export default App;
