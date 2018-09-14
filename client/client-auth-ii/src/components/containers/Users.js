import React, { Component } from 'react'
import { connect } from 'react-redux';
import { usersFetching } from '../../store/actions';

import Authorization from '../HOC/Authorization';

class Users extends Component {

  componentDidMount() {
    const jwt = localStorage.getItem('jwt')
    const reqOptions = {
      headers: {
        Authorization: jwt,
      }
    }
    this.props.usersFetching(reqOptions);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>hello</h1>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  usersFetching: jwt => {
    dispatch(usersFetching(jwt));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Users);
