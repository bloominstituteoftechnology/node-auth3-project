import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:3000/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("ERROR");
      });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
