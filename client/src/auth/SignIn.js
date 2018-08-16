import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleInputChange = (e) => {
    // handle the input change and updates the state
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // name is in brackets because its being changed dynamically
    // passing value to a variable that will change
    // it updates a property called name with the value
  };

  submitHandler = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', this.state)
      .then((response) => {
        // console.log('data', response.data);
        const token = response.data;
        //we hold on to it and save it
        localStorage.setItem('jwt', token);
      })
      .catch((err) => {
        console.error('axios failed');
      });
    console.log('state', this.state);
  };

  render() {
    return (
      <div className="App">
        <h1>SignIn Component</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              name="username"
              value={this.state.username}
              type="text"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input
              name="password"
              value={this.state.password}
              type="password"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
