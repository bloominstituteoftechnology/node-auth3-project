import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/login", this.state)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.submitHandler}>
          <label>Username:</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <label>Password:</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
            type="password"
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
