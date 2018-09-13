import React from 'react';
import { connect } from 'react-redux';

const Home = ({ isLoggedIn, username }) => {
  return(
    <React.Fragment>
      {isLoggedIn ? <h1>Hello {username}</h1> :
                    <h1>Please Log In or Register</h1>}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username
  }
}

export default connect(mapStateToProps)(Home);
