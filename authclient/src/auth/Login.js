import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username:'john',
        password:'password'
    };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
            <label htmlFor="username">Username:
            </label>
                <input  name="username" 
                    value={this.state.username}
                    type="text" 
                    onChange={this.handleInputChange}/>
        </div>
        <div>
            <label htmlFor="password">Password:
            </label>
                <input name="password" 
                    value={this.state.password} 
                    type="password" 
                    onChange={this.handleInputChange}/>
        </div>
        <div>
            <button type="submit">
                Log in
            </button>
        </div>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value })
  }

 handleSubmit = event => {
     event.preventDefault();
 
 

  
    const endpoint = 'http://localhost:7700/api/login';
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
          console.log(res.data);
          localStorage.setItem("jwt", res.data.token)
      })
      .catch(err => {
          console.error("We got us an error here", err);
      });
  };
}


export default Login;
