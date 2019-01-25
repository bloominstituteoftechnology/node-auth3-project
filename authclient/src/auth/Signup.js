import React, { Component } from 'react';
import axios from 'axios';


class Signup extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange} 
            type='text'
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            name="password" 
            value={this.state.password}
            onChange={this.handleInputChange} 
            type='password'
          />
        </div>
        <div>
          <label htmlFor="department">Department: </label>
          <input 
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange} 
            type='text'
          />
        </div>
        <div>
          <button type="submit" onClick={this.handleSubmit}>
          Submit
          </button>
        </div>
      </form>
      

    );
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name] : target.value });
  }

  handleSubmit = event => {
    // event.preventDefault();
    const credentials = this.state;
    const endpoint = 'http://localhost:5112/api/register';
    axios.post(endpoint, credentials)
    .then(res => {
      localStorage.setItem('jwt', res.data.token);
      this.props.history.push("/users");
    }).catch(err => {
      console.log('Registration Error', err);
    });
  }
}

export default Signup;