import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    const endPoint = "http://localhost:4200/api/users";

    axios.get(endPoint).then(res => {
      console.log(res.data).catch(err => {
        console.log("Error", err);
      });
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
