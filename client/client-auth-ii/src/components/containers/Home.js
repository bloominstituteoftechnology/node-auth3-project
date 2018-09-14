import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { rolesFetching } from '../../store/actions';

import logo from '../../logo.svg';


class Home extends Component {

  componentDidMount() {
    this.props.rolesFetching();
  }

  render() {
    return (
      <main>
        <header>
          <h1>Welcome</h1>
        </header>

        {this.props.isRolesFetching && this.props.isUserFetching ?
          <img src={logo} className="App-logo" alt="logo" />
          :
          <section>
            <div>
              <NavLink to="/register">Register</NavLink>
            </div>
            <div>
              <NavLink to="/login">Log In</NavLink>
            </div>
          </section>
        }
      </main>
    )
  }
}


// const mapStateToProps = state => ({
//   roles: state.roles
// });

export default connect(
  null,
  { rolesFetching }
)(Home);
