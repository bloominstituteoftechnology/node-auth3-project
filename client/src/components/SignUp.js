import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  firstName: '',
  lastName: '',
  // username: '',
  password: '',
  department: 'product'
}

// const SignUp = () => (
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:  {...initialUser},
      message: ''
    };
  }

  addUser = event => {
    event.preventDefault();
    const { firstName, lastName, password, department } = this.state.user
    const userObj = {
      username: firstName+lastName[0],
      password: password,
      department: department
    }
    axios.post(`${url}/api/register`, userObj)
      .then(res => {
        if(res.status === 200 || res.status === 201) {
          this.setState({
            message: 'Registration successful',
            user: { 
              ...initialUser
             },
          })
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: 'Registration failed',
          user: { ...initialUser },
        })
      }
    )
  }

  handleInputChange = event => {
    // this.setState({ [e.target.name]: e.target.value });
    const { name, value } = event.target;
    this.setState( { user: { ...this.state.user, [name]: value}})
  };

  render() {
    return ( 
      <div>
        <form className='signup-form' onSubmit={this.addUser}>
          <input 
            type="text" 
            id='firstName'
            className='firstName' 
            placeholder='First Name'
            onChange={this.handleInputChange}
            value={this.state.user.firstName}
            name='firstName'/>	
          <input 
            type="text" 
            id='lastName'
            className='lastName' 
            placeholder='Last Name'
            onChange={this.handleInputChange}
            value={this.state.user.lastName}
            name='lastName'/>
          <input 
            type="password" 
            id='password'
            className='password' 
            placeholder='Password'
            onChange={this.handleInputChange}
            value={this.state.user.password}
            name='password'/>
          <select>
            <option className='department' value='marketing'>Marketing</option>
            <option className='department' value='sales'>Sales</option>
            <option className='department' value='product'>Product</option>
          </select>	
          <button className='btn' type="submit" onClick={this.addUser}>Submit</button>	
        </form>
        { this.state.message
          ? (<h4>{this.state.message}</h4>)
          : undefined
        }
      </div>
    );
  }
}

SignUp.propTypes = {
  addUser: PropTypes.func,
}

export default SignUp;