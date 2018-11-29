import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RegSuccess from './RegSuccess';

//styled components
const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10vh;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
`;

const StyledInput = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 10px;
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
    this.props.history.push('/login');
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
        <button type='submit'>submit</button>
      </StyledForm>
      { this.state.message && (<h3>{this.state.message}</h3>) }
    </div>
    )
  }
}

export default Register;
