import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div>
        <h2>
          Can't see the list of users? Sign up <Link to="/signup">here!</Link>
        </h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:3300/api/users", reqOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  }
}

export default Users;
