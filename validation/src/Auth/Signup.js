import React, { Component } from "react";
import axios from "axios";

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

    axios
      .post("http://localhost:7000/api/register", this.state)
      .then(res => {
        if (this.state.password === this.state.password2) {
          localStorage.setItem("jwt", res.data.token);
          this.props.history.push("/users");
        }
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  };

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
          <button type="submit">Signup</button>
        </div>
      </form>
    );
  }
}

export default Signup;
