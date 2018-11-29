import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RegSuccess from './RegSuccess';

//styled components
const StyledForm = styled.form`
  background: #76323F;
  border-radius: 5px;
  color: #D7CEC7;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 3% auto;
  padding: 30px 10px;
  width: 50%;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
`;

const StyledInput = styled.input`
  background: #D7CEC7;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 10px;
`;

const StyledButton = styled.button`
  background: #C09F80;
  border: 1px solid #565656;
  border-radius: 3px;
  color: #565656;
  cursor: pointer;
  padding: 7px;
  margin-top: 10px;

  &&:hover {
    background: #565656;
    border: qpx solid #C09F80;
    color: #C09F80;
  }
`;
const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: '',
  password: '',
  department: '',
}


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: '',
      wasSuccessful: false,
    }
  }

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value }})
  }

  goToLogin = event => {
    this.props.history.push('/signin');
  }

  submitHandler = event => {
    event.preventDefault();
    axios
      .post(`${url}/api/register`, this.state.user)
      .then(response => {
        if (response.status === 201) {
          this.setState({
            wasSuccessful: true,
            user: { ...initialUser },
          })
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: 'Registration failed.',
          user: { ...initialUser },
        })
      })
  }
  render() {
    if (this.state.wasSuccessful) {
      return <RegSuccess goToLogin={this.goToLogin} />
    }
    return (
      <div>
      <h3>Please provide the information below to set up your account</h3>
      <StyledForm onSubmit={this.submitHandler}>
        <StyledLabel htmlFor='username'>Username</StyledLabel>
        <StyledInput
          type='text'
          id='username'
          name='username'
          value={this.state.user.username}
          onChange={this.inputHandler}
        />
        <StyledLabel htmlFor='password'>Password</StyledLabel>
        <StyledInput
          type='text'
          id='password'
          name='password'
          value={this.state.user.password}
          onChange={this.inputHandler}
        />
        <StyledLabel htmlFor='department'>Department</StyledLabel>
        <StyledInput
          type='text'
          id='department'
          name='department'
          value={this.state.user.department}
          onChange={this.inputHandler}
        />
        <StyledButton type='submit'>Register</StyledButton>
      </StyledForm>
      { this.state.message && (<h3>{this.state.message}</h3>) }
    </div>
    )
  }
}

export default Register;
