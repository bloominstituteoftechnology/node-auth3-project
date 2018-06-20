import React, { Component } from 'react';
import axios from 'axios';

export default class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
    };
  }    

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
}  

submitHandler = e => {
  e.preventDefault();
  axios
    .post('http://localhost:5500/api/auth/login', this.state)
    .then(response => {
      console.log(response.data);
      console.log(response);
      if (response.data.message && response.data.token) {
        localStorage.setItem('jwt', response.data.token);
        console.log('signing props', this.props);
        this.props.history.push('/users');
      } else {
        console.log('problem')
      }
    })
    .catch(error => {
      console.error('Server Error', error);
    });
}

  render() {
    return (
      <div>
        <form>
            <h1>Sign In</h1>
            <h2>Username:</h2>
            <input name="username" onChange={this.handleChange} value={this.state.username} /> 
            <h2>Password:</h2>
            <input name="password" onChange={this.handleChange} value={this.state.password} />
        </form><br></br>
        <button type="submit" onClick={this.submitHandler}><h3>Sign In</h3></button>
      </div>
    )
  }
}
