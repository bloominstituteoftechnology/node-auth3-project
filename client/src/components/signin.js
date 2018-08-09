import React from "react";
import axios from "axios";

class Signin extends React.Component {
  state = {
    username: "",
    password: ""
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/login", this.state)
      .then(res => {
        const token = res.data;
        localStorage.setItem("jwt", token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("Axios failed");
      });
  };

  render() {
    return (
      <div className="Signin">
        <h1>Sign In</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              name="username"
              value={this.state.username}
              onChange={this.inputChangeHandler}
              type="text"
              placeholder="username..."
            />
          </div>
          <br/>
          <div>
            <input
              name="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
              type="password"
              placeholder="password..."
            />
          </div>
          <br/>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
