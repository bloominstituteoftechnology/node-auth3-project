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

  render() {
    return (
      <div className="form-wrapper">
        <h2>LOGIN</h2>
        <form>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="User Name"
              value={this.state.username}
              onChange={this.state.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="password"
              placeholder="PASSWORD"
              value={this.state.password}
              onChange={this.state.handleChange}
            />
          </div>
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
