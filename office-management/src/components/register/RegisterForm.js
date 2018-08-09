import React, { Component } from "react";
import "bulma/css/bulma.css";
class RegisterForm extends Component {
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
    this.props.history.push('/login');
  };
  render() {
    return (
      <form
        onSubmit={this.loginHandler}
      >
        <div className="container">
          <div className="field">
            <label className="label">Create Username</label>
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
            <label className="label">Create Password</label>
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
          <button type="submit" className = "btn is-primary">Create user</button>
        </div>
      </form>
    );
  }
}


export default RegisterForm;