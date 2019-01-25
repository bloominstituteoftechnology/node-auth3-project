import React from 'react';
import auth from '../apis/auth';

export default class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    department: ''
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const res = await auth.post('/register', this.state);
    localStorage.setItem('token', res.data);
    this.props.history.push('/users');
  };

  renderForm = () => {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h2>Sign Up</h2>
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
        <div>
          <label>Department</label>
          <input
            value={this.state.department}
            name='department'
            onChange={this.onInputChange}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    );
  };

  render() {
    return this.renderForm();
  }
}
