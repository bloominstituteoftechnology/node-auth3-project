import React, { Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 5rem auto 0;
  padding: 2rem;
  border-radius: 2px;
  box-shadow: 3px 6px 6px rgba(0, 0, 0, 0.2);
  h3 {
    font-weight: 300;
    font-size: 3rem;
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 2px solid #ebebeb;
  }
  input,
  button {
    font-size: inherit;
    margin-bottom: 3rem;
    border-radius: 2px;
  }
  input {
    background: #f8f8f8;
    border: 1px solid #ebebeb;
    padding: 1.5rem;
    &:focus {
      outline-color: #d1d1d1;
      outline-style: solid;
      outline-width: 2px;
    }
  }

  button {
    background: #42a6eb;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    padding: 2rem 1rem;
    transition: all 0.2s;
    border: none;
    &:hover {
      background: #b5dbf7;
    }
  }
`;

const initalUser = {
  username: '',
  password: '',
  department: ''
};

const url = process.env.REACT_APP_API_URL;

class Register extends Component {
  state = {
    user: { ...initalUser },
    message: ''
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  render() {
    const { username, password, department } = this.state.user;
    return (
      <div>
        <StyledForm>
          <h3>Sign Up</h3>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter a username..."
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter a password..."
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="department"
            value={department}
            placeholder="Enter your department..."
            onChange={this.handleInputChange}
          />
          <button type="submit">Sign Up</button>
        </StyledForm>
      </div>
    );
  }
}

export default Register;
