import React, { Component } from "react";
import "bulma/css/bulma.css";
import axios from 'axios';
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      department: "normal"
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUserHandler = (e) => {
    e.preventDefault();
    const requestBody = {
      ...this.state
    }
    axios.post('http://localhost:8001/api/register', requestBody)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    })
    this.props.history.push('/login');
  };
  render() {
    return (
      <form
        onSubmit={this.registerUserHandler}
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
          <select name = "department" onChange = {this.changeHandler}>
  <option value="admin">Admin</option>
  <option value="normal" selected>Normal</option>
  <option value="plebian">Plebian</option>
</select>
          <button type="submit" className = "btn is-primary">Create user</button>
        </div>
      </form>
    );
  }
}


export default RegisterForm;