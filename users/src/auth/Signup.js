import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      department: ""
    };
  }
  signup = event => {
    event.preventDefault();
    const {username, password, department} = this.state
    const user = {username, password, department} 
    if (this.state.password === this.state.password2) {
    axios
      .post("http://localhost:7000/api/register", user)
      .then(res => {
          localStorage.setItem("jwt", res.data.token);
          this.props.history.push("/users");
        
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  } else {
      return console.log('Passwords do not match')
  }
}

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.signup}>
        <div>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            type="password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            value={this.state.password2}
            onChange={this.handleChange}
            name="password2"
            type="password"
          />
        </div>
        <div>
          <label>Department</label>
          <input
            value={this.state.department}
            onChange={this.handleChange}
            name="department"
            type="text"
          />
        </div>
        <div>
          <Link to='/users'><button type="submit">Signup</button></Link>
        </div>
      </form>
    );
  }
}

export default Signup;