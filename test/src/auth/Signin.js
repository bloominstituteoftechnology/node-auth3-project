import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const auth = this.state;
    const endpoint = 'http://localhost:1234/api/login';
    
    axios.post(endpoint, auth)
      .then( (res) => {
        console.log('response data from login', res.data);
      })
      .catch( (err) => {
        console.log('error on login', err);
      });
    // end-axios.post
  };

  render() {
    return (
      <div className='signin'>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input name="username" type="text" onChange={this.handleInputChange}/>
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" onChange={this.handleInputChange}/>
          </div>

          <div>
            <button type='submit'>Log In</button>
          </div>
        </form>
      </div>
    );
  };
};

export default Signin;