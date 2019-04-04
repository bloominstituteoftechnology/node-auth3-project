import React, {Component} from "react";
import axios from "axios";

const initialUser = {
  username: "",
  password: "",
  department: ""
};

const url = "http://localhost:3800";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {...initialUser},
      message: ""
    };
  }

  submitHandler = e => {
    e.preventDefault();
    axios
      .post(`${url}/api/register`, this.state.user)
      .then(res => {
        if (res.status < 300 && res.status >= 200) {
          this.props.history.push("/");
          this.setState({
            message: "Registration Successful",
            user: {...initialUser}
          });
        } else {
          throw new Error();
        }
      })
      // .then(res => this.history.push('/'))
      .catch(err => {
        console.log(err);
        this.setState({
          message: "Registration Failed"
        });
      });
  };

  inputHandler = e => {
    // this.setState({[e.target.name]: e.target.value});
    const {name, value} = e.target;
    this.setState({user: {...this.state.user, [name]: value}});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.inputHandler}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={this.state.user.password}
            onChange={this.inputHandler}
            required
          />
          <br />
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={this.state.user.department}
            onChange={this.inputHandler}
          />
          <br />
          <button>Register</button>
        </form>
        {this.state.message ? <h4>{this.state.message}</h4> : null}
      </div>
    );
  }
}
