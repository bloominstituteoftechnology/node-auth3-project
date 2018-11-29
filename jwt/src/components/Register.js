import React, {Component} from "react";
import axios from "axios";

const initialUser = {
  username: "",
  password: ""
};

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
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={this.state.username}
        />
      </form>
    );
  }
}
