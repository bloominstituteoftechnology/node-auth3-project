import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/users">Users</Link>
      </div>
    );
  }
}

export default Home;