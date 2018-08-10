import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/register';

class SignUpView extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      department: ''
    };
  }

  handleInputChange = e => {
    const stateObj = this.state;
    stateObj[e.target.name] = e.target.value;
    this.setState(stateObj);
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {...this.state};
    axios
    .post(API_URL, user)
    .then(res=> {
      console.log('posted', res);
      const token = res.data.token;
      localStorage.setItem('jwt', token);
      this.setState({
        username: '',
        password: '',
        department: ''        
      });
      window.location.href = '/users';
    })
    .catch(error => { 
      console.log(error);
      alert('There was an error signing up.');
    });    
    console.log('click sign up', this.state);
  };

  render() {
    return (
      <main className="sign-up-view">
        <h2>Sign Up</h2>
        <form>
          <input 
            name="username" 
            type="text" 
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange} />
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange} />
          <input 
            name="department" 
            type="text" 
            placeholder="Department"
            value={this.state.department}
            onChange={this.handleInputChange} />
          <button type="submit" onClick={this.onSubmit}>Sign Me Up</button>
        </form>
      </main>
    );
  }
};

export default SignUpView;