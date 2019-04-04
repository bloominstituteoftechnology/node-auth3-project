import React, { Component } from 'react';
import './App.css';
import { Route, NavLink} from 'react-router-dom';
import Login from './components/login/Login.js'
class App extends Component {
  render() {
    return (
    <>
      <header>
        <NavLink to='/'> Home </NavLink>
        &nbsp;|&nbsp;
        <NavLink to ='/login'> Login </NavLink>
        &nbsp;|&nbsp;
      </header>

      <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
      </main>
      
    </>
    );
  }
}

function Home(props) {
  return <h1> </h1>;
}

export default App;
