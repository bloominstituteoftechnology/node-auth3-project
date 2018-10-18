import React, { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component {
  state = {
      username: '',
      password: '',
      department: ''
    }

  userSignUp = event => {
    // event.preventDefault();
    
    const user = {username: this.state.username, password: this.state.password, department: this.state.department};

    axios
      .post('http://localhost:4000/api/register', user)

      .then(response => 
            this.setState({ user: response.data.users})
          )
        
      .catch(err => {
        console.log(err);
      });

    this.setState({
      username: '',
      password: '',
      department: ''
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SignUpForm">
        <form onSubmit={this.userSignUp}>
          <input
            onChange={this.handleInputChange}
            placeholder="username"
            value={this.state.username}
            name="username"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="department"
            value={this.state.department}
            name="department"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="password"
            value={this.state.password}
            name="password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;