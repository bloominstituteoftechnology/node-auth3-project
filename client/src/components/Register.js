import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        username: "",
        password: "",
        department: ""
      }
    };
  }

  render() {
    return (
      <div>
        <form>
          <label>Username:
            <input type="text" name="username" />
          </label>
          <label>Password:
            <input type="password" name="password" />
          </label>
          <label>Department:
            <input type="text" name="department" />
          </label>
          <button>register</button>
        </form>
      </div>
    );
  }
}

export default Register;
