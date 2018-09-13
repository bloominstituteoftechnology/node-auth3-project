import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import styled from 'styled-components';

class SignUpContainer extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
  };

  render() {
    return (
      <div>
        <Form
          type={'signUp'}
          username={this.state.username}
          password={this.state.password}
          password2={this.state.password2}
          handleChange={e => this.setState({ [e.target.name]: e.target.value })}
          handleSubmit={this.handleSubmit}
        />
        <div>
          <p>Already Have an Account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    );
  }
}

export default connect()(SignUpContainer);
