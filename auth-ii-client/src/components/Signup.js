import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }
  

  render() {
    return (
      <form>

        <div className="form-username">
          <label htmlfor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlfor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
          />
        </div>

        <div>
          <button type='submit'>Register</button>
        </div>

      </form>
    );
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name] : e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const creds = this.state;
    const endpoint = 'http://localhost:3300/api/register';
    axios.post(endpoint, creds)
      .then(res => {
        console.log('response data: ', res.data);
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log('Error from Login', err)
      })
  }
}

export default Signup;