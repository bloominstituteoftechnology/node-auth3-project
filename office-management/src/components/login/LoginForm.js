import React, { Component } from "react";
import "bulma/css/bulma.css";
import axios from 'axios';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = (e) => {
    e.preventDefault();

    const requestBody = {
      ...this.state,
    };
    axios.post('http://localhost:8001/api/login', requestBody)
    .then(res => {
      console.log(res.data);
      localStorage.setItem('jwt', res.data);
    })
    .catch(err => {
      console.log(err);
    });
    this.props.history.push('/users');
  };
  render() {
    return (
      <form
        onSubmit={this.loginHandler}
      >
        <div className="container">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <button type="submit" className = "btn is-primary">Login</button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
