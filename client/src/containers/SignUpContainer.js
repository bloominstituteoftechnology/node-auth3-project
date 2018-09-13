import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { signUp, getDepartments } from '../actions';
import styled from 'styled-components';
import AuthWrap from '../components/AuthWrap';

class SignUpContainer extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    department: '1',
  };

  componentDidMount() {
    this.props.getDepartments();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp({
      username: this.state.username,
      password: this.state.password,
      department: this.state.department,
    });
  };

  render() {
    return (
      <AuthWrap type="signUp">
        <Form
          type="signUp"
          department={this.state.department}
          username={this.state.username}
          password={this.state.password}
          password2={this.state.password2}
          handleChange={e => {
            console.log(e);
            this.setState({ [e.target.name]: e.target.value });
          }}
          handleSubmit={this.handleSubmit}
          departments={this.props.departments}
        />
      </AuthWrap>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.departments,
});

export default connect(
  mapStateToProps,
  { signUp, getDepartments },
)(SignUpContainer);
