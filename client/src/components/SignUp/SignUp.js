import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      race: ''
    }
  }
  handleOnChange = event => {
    this.setState({ [event.target.name]:event.target.value });
  }
  signUp = event => {
    event.preventDefault();
    const user =  {
      username: this.state.username,
      password: this.state.password,
      race: this.state.race
    };
    axios.post('http://localhost:5500/api/auth/register', user)
      .then(response => {
        localStorage.setItem('authiiToken', response.data.token);
        this.props.history.push('/users');
      })
      .catch(error => {
        // TO DO: Show error to user
        console.log('Could not sign user up', error);
      });
  }
  render() { 
    return (
      <div>
        <h1>Sign Up</h1>
        <form>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={this.state.username}
            onChange={this.handleOnChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
          <input
            type="text"
            name="race"
            placeholder="Race"
            value={this.state.race}
            onChange={this.handleOnChange}
          />
          <button onClick={this.signUp}>Sign Up</button>
        </form>
      </div>
    )
  }
}
 
export default SignUp;