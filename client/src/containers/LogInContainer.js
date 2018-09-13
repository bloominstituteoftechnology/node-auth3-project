import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../components/Form';
import { logIn } from '../actions';
import AuthWrap from '../components/AuthWrap';
import styled from 'styled-components';

class LogInContainer extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state);
  };

  render() {
    return (
      <AuthWrap>
        <Form
          username={this.state.username}
          password={this.state.password}
          handleChange={e => this.setState({ [e.target.name]: e.target.value })}
          handleSubmit={this.handleSubmit}
        />
      </AuthWrap>
    );
  }
}

export default connect(
  null,
  { logIn },
)(LogInContainer);
