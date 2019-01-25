import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Auth-ii</h1>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/signin'>Sign In</Link>
            <Link to='/users'>Users</Link>
        </nav>
      </div>
    );
  }
}

export default Home;
