import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      department: "",
      msg: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const auth = {
      user: this.state.username,
      pass: this.state.password,
      dept: this.state.department
    };
    const endpoint = 'http://localhost:1234/api/register';
    
    axios.post(endpoint, auth)
      .then( (res) => {
        console.log('response data from register', res.data);
        if( res.status === 200 ){
          console.log('successful register');
          localStorage.setItem('jwt', res.data.token);
        } else {
          this.setState({ msg: "Invalid Username or Password."});
        }
      })
      .catch( (err) => {
        console.log('error on registration', err);
        this.setState({ msg: "Please try again later."});
      });
    // end-axios.post
  };

  render() {
    return (
      <div className='signin'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input name="username" type="text" onChange={this.handleInputChange}/>
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" onChange={this.handleInputChange}/>
          </div>

          <div>
            <label htmlFor="department">Department:</label>
            <input name="department" type="text" onChange={this.handleInputChange}/>
          </div>

          <div>
            <button type='submit'>Register</button>
          </div>
          <div>{this.state.msg}</div>
        </form>
      </div>
    );
  };
};

export default Register;