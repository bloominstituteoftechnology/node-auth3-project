import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, department } = this.state;
    this.props.registerUser({
      username,
      password,
      department
    }, this.props.history);
  }

  render() {
    return (
      <div className='register'>
        <h1>Register!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='username'
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            name='password'
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            name='department'
            onChange={this.handleInputChange}
          />
          <button>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
