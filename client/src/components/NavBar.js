import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions';

const NavBar = ({ isLoggedIn, logout }) => {
  return(
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      {isLoggedIn ? <div className="logout" onClick={logout}>Log Out</div> :
                    <Link to="/login">Log in</Link>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, { logout })(NavBar);
