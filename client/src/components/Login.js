import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

//styled components
const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3%; 
`;

const StyledLabel = styled.label`
  font-size: 1rem;
`;

const StyledInput = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 10px;
`;
//url stored in .env
const url = process.env.REACT_APP_API_URL;

//initial state (also reset state)
const initialUser = {
  username: '',
  password: '',
  department: '',
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: '',
    }
  }

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value }})
  }

  submitHandler = event => {
    event.preventDefault();
    axios
      .post(`${url}/api/login`, this.state.user)
      .then(response => {
        if (response.status === 200 && response.data) {
          localStorage.setItem('super_secret', response.data.token)
          this.setState({
            message: 'Login successful',
            user: { ...initialUser },
          })
          this.props.history.push('/home');
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: 'Login failed',
          user: { ...initialUser },
        })
      })
  }
  render() {
    return (
      <div>
      <h3>Please Login</h3>
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
        <button type='submit'>submit</button>
      </StyledForm>
      { this.state.message && (<h3>{this.state.message}</h3>) }
    </div>
    )
  }
}

export default Login;
