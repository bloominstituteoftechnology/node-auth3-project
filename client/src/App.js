import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Users from './Users/Users.js';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>Home</NavLink>
            &npsp; |&npsp; 
            <NavLink to="/users">Users</NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} />
            <Route path='/users' component={Users} />
        </header>
      </div>
    );
  }
}

export default App;
