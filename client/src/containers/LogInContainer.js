import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import styled from 'styled-components';

class LogInContainer extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <Form
          username={this.state.username}
          password={this.state.password}
          handleChange={e => this.setState({ [e.target.name]: e.target.value })}
          handleSubmit={this.handleSubmit}
        />
        <div>
          <p>Don't Have an Account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default connect()(LogInContainer);
