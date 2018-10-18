import React from "react";
import axios from "axios";

class Login extends React.PureComponent {
  state = {
    username: "",
    password: "",
    error: null
  };
  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    axios
      .post("/api/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(resp => {
        console.log(resp.data);
        localStorage.setItem("jwt", resp.data.token);
        this.props.history.push("/users");
      })
      .catch(error => this.setState({ error }));
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px"
        }}
      >
        <div style={{ padding: "5px" }}>
          <label htmlFor="">Username: {"  "}</label>
          <input onChange={this.handleOnChange} type="text" name="username" />
        </div>
        <div style={{ padding: "20px" }}>
          <label htmlFor="">Password: {"  "}</label>
          <input
            onChange={this.handleOnChange}
            type="password"
            name="password"
          />
        </div>
        <div>
          <button onClick={this.handleSubmit} style={{ fontSize: "16px" }}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
