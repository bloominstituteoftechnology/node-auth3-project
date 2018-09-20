import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      department: "",
    };
  }
   handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
   register = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", {
        username: `${this.state.username}`,
        password: `${this.state.password}`,
        department: `${this.state.department}`
      })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(error => {
        console.error("Server Error", error);
      });
    this.setState({
      username: "",
      password: "",
      department: ""
    });
  };
   render() {
    return (
      <div>
        <form className="login">
          <input
            onChange={this.handleInputChange}
            name="username"
            placeholder="username"
          />
          <input
            type="password"
            onChange={this.handleInputChange}
            name="password"
            placeholder="password"
          />
          <input
            onChange={this.handleInputChange}
            name="department"
            placeholder="department"
          />
          <Link to="/users">
            <button onClick={this.register}>Ready? Sign up!</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;