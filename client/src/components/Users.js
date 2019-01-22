import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  componentDidMount() {
    const endpoint = "http://localhost:3000/api/users";

    axios
      .get(endpoint)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log("ERROR");
      });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
      </div>
    );
  }
}

export default Users;
