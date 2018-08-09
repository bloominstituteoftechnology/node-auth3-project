import React from "react";
import axios from "axios";
import "../App.css"

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
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <div className="sign-in">
        <h1 className="header-title">Sign In</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
             className="input-box"
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
             className="input-box"
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
