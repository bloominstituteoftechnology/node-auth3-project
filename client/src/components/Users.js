import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = { headers: { Authorization: token } };
    axios
      .get("http://localhost:8000/api/users", requestOptions)
      .then(response => this.setState({ users: response.data }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="Users">
        <h1>Users</h1>
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
