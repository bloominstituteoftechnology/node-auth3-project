import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions';

class NavBar extends Component {
  logoutAndRedirect = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render(){
    return(
      <div className="nav">
        <Link to="/">Home</Link>
        {this.props.isLoggedIn && <Link to="/users">Users</Link>}
        {this.props.isLoggedIn ? <div className="logout" onClick={this.logoutAndRedirect}>Log Out</div> :
                      <div className="link-grouper">
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                      </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, { logout })(NavBar));
