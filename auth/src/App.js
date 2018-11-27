import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import Users from './users/Users';

const Home = props => {
  return (
    <div>
      <h1> Home </h1>
    </div>
  )
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            </nav>
            <main>
              <Route path="/" component={Home} exact />
              <Route path="/users" component={Users} />
          </main>
          </header>
      </div>
    );
  }
}

export default App;
