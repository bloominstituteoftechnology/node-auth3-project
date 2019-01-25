import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/'>Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/register'>Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/login'>Login</NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users'>Users</NavLink>
          </nav>
          <main>
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/users' component={Users} /> */}
          </main>
        </header>
      </div>
    );
  }
}

const Home = props => {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}

export default App;
