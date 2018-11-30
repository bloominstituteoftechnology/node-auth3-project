import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  // username: '',
  // password: '',
  // firstName: '',
  // lastName: '',
  username: '',
  password: '',
  department: 'product'
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { ...initialUser },
      message: '',
    }
  }

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState( { user: { ...this.state.user, [name]: value}})
  }

  submitHandler = event => {
    event.preventDefault();
    const { firstName, lastName, username, password, department } = this.state.user
    const userObj = {
      username: username,
      password: password,
      department: department
    }
    axios.post(`${url}/api/login`, userObj)
      .then(res => {
        console.log('res.data.token', res.data.token)
        if((res.status === 200 || res.status === 201) && res.data.token) {
          localStorage.setItem('secret_bitcoin_token', res.data.token)
          this.setState({
            message: 'Login successful',
            user: { ...initialUser },
          })
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: 'Login failed',
          user: { ...initialUser },
        })
      }
    )
  }

  render() {
    return(
      <div>
        <form className='signin-form' onSubmit={this.submitHandler}>
          <input 
            type="text" 
            className='username' 
            id='username' 
            name='username' 
            placeholder='username' 
            value={this.state.user.username}
            onChange={this.inputHandler} />	
          <input 
            type="password" 
            className='password' 
            placeholder='Password'
            id='password' 
            name='password'
            value={this.state.user.password}
            onChange={this.inputHandler}
            />
          <input className='btn' type="submit"/>	
        </form>
        { this.state.message
          ? (<h4>{this.state.message}</h4>)
          : undefined
        }
      </div>
    );
  }
}

export default SignIn;