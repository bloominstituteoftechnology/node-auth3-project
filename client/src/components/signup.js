import React from "react";
import axios from "axios";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/register", this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data);
        this.props.history.push('/users')
      })
      .catch(err => {
        console.error("Axios failed");
      });
  };

  render() {
    return (
      <div className="Signup">
        <h1>Register A New User</h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              name="username"
              value={this.state.username}
              onChange={this.inputChangeHandler}
              type="text"
              placeholder='username...'
            />
          </div>
          <br/>
          <div>
            <input
              name="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
              type="password"
              placeholder='password...'
            />
          </div>
          <br/>
          <div>
            <input
              name="department"
              value={this.state.department}
              onChange={this.inputChangeHandler}
              type="text"
              placeholder="department..."
            />
          </div>
          <br/>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
