import React, { Component } from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api';

class SignUp extends Component {
  state = { name: '', pass: '', department: '' };

  signUp = (e) => {
    e.preventDefault();
    axios.post(`${URL}/register`, this.state)
      .then(({ data }) => {
        this.props.history.push('/signin');
      })
      .catch(err => console.error(err));
  };

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.signUp}>
        <div>
          <label>Username</label>
          <input 
            value={this.state.name} 
            onChange={this.onChange} 
            name="name" 
            type="text" 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            value={this.state.pass} 
            onChange={this.onChange} 
            name="pass" 
            type="password"
          />
        </div>
        <div>
          <label>Department</label>
          <input 
            value={this.state.department} 
            onChange={this.onChange} 
            name="department" 
            type="text"
          />
        </div>
        <button>Sign up</button>
      </form>
    );
  }
}

export default SignUp;
