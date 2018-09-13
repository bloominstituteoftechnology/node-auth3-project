import React, { Component } from "react";
import axios from 'axios'

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  signin= event => {
    event.preventDefault(); 

     axios
     .post("http://localhost:3300/api/login", this.state)
     .then(res =>{
         console.log(res.data)
         localStorage.setItem('jwt', res.data.token); 
     })
     .catch(err => {
         console.log("error", err) 
     })
}; 
  handleChange = event =>{
      const {name, value} = event.target; 
      this.setState({[name]: value});
  }; 

  render() {
    return (
      <div>
          <form onSubmit={this.signin}>
        <input
          type="text"
          placeholder="username"
          onChange={this.handleChange}
          value={this.state.username}
          name="username"
        />
         <input
          type="text"
          placeholder="password"
          onChange={this.handleChange}
          value={this.state.password}
          name="password"
        />
        <button onClick={this.submitUser}>Sign In </button>
        </form>
      </div>
    );
  }
}

export default Signin; 
