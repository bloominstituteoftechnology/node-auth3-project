import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import SignUp from './components/SignUp';
import style from './app.module.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className={style.nav}>
          <Link className={style.link} to="/">
            Home
          </Link>
          <Link className={style.link} to="/login">
            Login
          </Link>
          <Link className={style.link} to="/users">
            Users
          </Link>
        </header>
        <Route exact path="/" render={() => <SignUp />} />
      </div>
    );
  }
}

export default App;
