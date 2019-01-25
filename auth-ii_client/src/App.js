import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import './App.css';

const Home = props => {
  return (
    <div>
      <h2>Welcome to</h2>
      <h1>Auth-II!!</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to='/'>Home</NavLink>
          </nav>
          <div>
            <Route exact path='/' component={Home} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
