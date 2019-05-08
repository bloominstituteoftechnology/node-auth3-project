import React, { Component } from "react";
import axios from "axios";

export default class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.error("USERS ERROR", err);
        localStorage.removeItem("token");
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.id}>
                Username: {user.username}, Department: {user.department}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
