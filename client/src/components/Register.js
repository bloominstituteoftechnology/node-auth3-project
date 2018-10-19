import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    department: '',
  };

  handleChange = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/register', this.state)
      .then(response => {
        console.log(response);
        localStorage.setItem('jwt', response.data.token);
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            Username
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="department">
            Department
            <input
              name="department"
              type="text"
              value={this.state.department}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Register;
