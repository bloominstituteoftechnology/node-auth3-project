import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    console.log("INPUT FORM EVENT: ", event);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("SUBMITTED");
  };

  render() {
    return (
      <div className="form-wrapper">
        <h2>LOGIN</h2>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="USER NAME"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="password"
            placeholder="PASSWORD"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-lg form-control">
            SUBMIT
          </button>
        </form>
        <h4>DONT HAVE AN ACCOUNT? CREATE ONE HERE</h4>
      </div>
    );
  }
}

export default Login;
