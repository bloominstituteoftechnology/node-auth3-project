import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    department: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  registerUser = event => {
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword) {
      return this.setState({ password: '', confirmPassword: '' })
    }
    const URL = 'http://localhost:8000/api/register';
    const departmentArr = this.state.department.split('');
    for(let i = 0; i < departmentArr.length; i++) {
      if (i === 0) {
        departmentArr[i] = departmentArr[i].toUpperCase();
      } else {
        departmentArr[i] = departmentArr[i].toLowerCase();
      }
    }
    const department = departmentArr.join('');
    const user = { 
      username: this.state.username,
      department,
      password: this.state.password
     };
    axios
      .post(URL, user)
      .then(response => {
        const token = response.data;
        localStorage.setItem('token', token)
        window.location.pathname = '/users';
      })
      .catch(err => console.log(err))
    }

  render() {
    return(
      <div className='register'>
        <form>
          <label>
            Create Username:
            <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Enter your department:
            <input type='text' name='department' value={this.state.department} onChange={this.handleChange} />
          </label>
          <label>
            Create Password:
            <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          </label>
          <label>
            Confirm Password:
            <input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} />
          </label>
          <button type='submit' onClick={this.registerUser}>
           Register
          </button>
        </form>
        <div className='already-registered'>
          <p>Already Registered?</p>
          <Link to='/'>
            Login
          </Link>
        </div>
      </div>
    )
  }
}

export default Register;