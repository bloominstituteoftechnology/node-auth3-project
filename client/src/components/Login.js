import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser({
      username,
      password
    });
  }

  render() {
    return (
      <div className='login'>
        <h1>Login!</h1>
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
          <button>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
