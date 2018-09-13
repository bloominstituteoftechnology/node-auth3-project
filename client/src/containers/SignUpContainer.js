import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { signUp } from '../actions';
import styled from 'styled-components';
import AuthWrap from '../components/AuthWrap';

class SignUpContainer extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp({
      username: this.state.username,
      password: this.state.password,
    });
  };

  render() {
    return (
      <AuthWrap type="signUp">
        <Form
          type="signUp"
          username={this.state.username}
          password={this.state.password}
          password2={this.state.password2}
          handleChange={e => this.setState({ [e.target.name]: e.target.value })}
          handleSubmit={this.handleSubmit}
        />
      </AuthWrap>
    );
  }
}

export default connect(
  null,
  { signUp },
)(SignUpContainer);
