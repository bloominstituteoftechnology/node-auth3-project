import React, { Component } from 'react';
import axios from 'axios';

import Input from './Input';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      race: ''
    };
  }

  setInputVal = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleRegister = e => {
    e.preventDefault();

    // const form = ({ username, password, race } = this.state);
    const { username, password, race } = this.state;
    const form = { username, password, race };

    axios.post('http://localhost:5500/api/auth/register', form)
      .then(({ data }) => {
        const { token } = data;
        console.log(data);
        window.localStorage.setItem('token', token);
        this.props.history.push('/users');
      })
      .catch(err => console.log(err));
  }
  
  render() { 
    const { setInputVal, handleRegister } = this;
    const { username, password, race } = this.state;
    
    return (
      <form>
        <Input
          inputType='text'
          inputName='username'
          inputValue={ username }
          inputOnChange={ setInputVal }
        />
        <Input
          inputType='password'
          inputName='password'
          inputValue={ password }
          inputOnChange={ setInputVal }
        />
        <Input
          inputType='text'
          inputName='race'
          inputValue={ race }
          inputOnChange={ setInputVal }
        />

        <Input
          inputType='submit'
          inputValue='Register'
          inputOnClick={ handleRegister }
        />
      </form>
    )
  }
}
 
export default Form;