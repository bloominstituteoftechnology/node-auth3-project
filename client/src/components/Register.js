import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: "",
  password: "",
  department: ""
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: ""
    };
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  submitHandler = event => {
    event.preventDefault();

    axios
      .post(`${url}/api/register`, this.state.user)
      .then(res => {
        if (res.status === 201 && res.data) {
          axios.post(`${url}/api/login`, this.state.user).then(res => {
            if (res.status === 200 && res.data) {
              localStorage.setItem("tolkien_token", res.data.token);
              this.props.history.push("/");
            } else {
              throw new Error();
            }
          });
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: "Registration failed!",
          user: { ...initialUser }
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.changeHandler}
            placeholder="Username"
          />
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.user.password}
            onChange={this.changeHandler}
            placeholder="Password"
          />
          <input
            type="text"
            id="department"
            name="department"
            value={this.state.user.department}
            onChange={this.changeHandler}
            placeholder="Department"
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.message ? <h4>{this.state.message}</h4> : undefined}
      </div>
    );
  }
}
