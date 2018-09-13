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
          <input type="text" name="username" />
          <input type="password" name="password" />
          <input type="text" name="department" />
          <button>register</button>
        </form>
      </div>
    );
  }
}

export default Register;
