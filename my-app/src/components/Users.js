import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    console.log(token)
    const reqOptions = {
      header: {
        Authorization: token,
      }
    };
    axios
      .get("http://localhost:8000/api/users", reqOptions)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => console.error("Error:", error));
  }

  render() {
    return (
      <div>
        <ul />
        {this.state.users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </div>
    );
  }
}

export default Users;
