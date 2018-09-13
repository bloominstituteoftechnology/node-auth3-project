import React from "react";
import axios from "axios";

class Signup extends React.Component {
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
      .post("http://localhost:8000/api/register", this.state)
      .then(res => {
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
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
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Signup;
