import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';


class Home extends Component {

  componentDidMount() {
    // action to get roles
  }

  render() {
    return (
      <main>
        <header>
          <h1>Welcome</h1>
        </header>
        <section>
          <div>
            <NavLink path="/register">Register</NavLink>
          </div>
          <div>
            <NavLink path="/login">Log In</NavLink>
          </div>
        </section>
      </main>
    )
  }
}

export default Home;
