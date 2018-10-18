import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const url = "http://localhost:9000/api/users";
    const options = {
      headers: {
        authorization: token
      }
    };
    axios
      .get(url, options)
      .then(response => {
        console.log(response.data);
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="users-container">
        <h1>List of Users:</h1>
        <ul>
          {this.state.users.map(u => (
            <li>{u.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
