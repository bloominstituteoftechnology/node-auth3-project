import React, { Component } from "react";

import "./App.css";
import axios from "axios";

class Register extends Component {
    state = {
        username: "",
        password: "",
        department: ""
      };




      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>username</label>
              <input
                value={this.state.username}
                name="username"
                onChange={this.handleInput}
                type="text"
              />
            </div>
            
            <div>
              <label>password</label>
              <input
                value={this.state.password}
                name="password"
                onChange={this.handleInput}
                type="password"
              />
            </div>

<div>
              <label>department</label>
              <input
                value={this.state.department}
                name="department"
                onChange={this.handleInput}
                type="text"
              />
            </div>

            <div>
              <button type="submit">Signup</button>
            </div>
            <div>{this.state.response}</div>
          </form>
        );
      }
    
      handleSubmit = event => {
        event.preventDefault();
        axios
          .post("http://localhost:3300/api/register", this.state)
          .then(response => {
            localStorage.setItem("jwt", response.data.token);
            this.setState({ response: "Welcome, " + response.data.username + "!" });
           
            this.props.history.push('/users')

          })
          .catch(err => console.log(err));
      };
    
      handleInput = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };
}

export default Register;
