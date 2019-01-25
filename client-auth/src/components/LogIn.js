import React from 'react';
import auth from '../apis/auth';

export default class SignUp extends React.Component {
  state = {
    username: '',
    password: ''
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    auth.post('/login', this.state).then(res => {
      localStorage.setItem('token', res.data);
      this.props.history.push('/users');
    });
  };

  renderForm = () => {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h2>Sign In</h2>
        <div>
          <label>Username</label>
          <input
            value={this.state.username}
            name='username'
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={this.state.password}
            name='password'
            onChange={this.onInputChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    );
  };

  render() {
    return this.renderForm();
  }
}
