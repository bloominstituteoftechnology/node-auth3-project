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
    const token = localStorage.getItem("jwt");
    const endPoint = "http://localhost:4200/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get(endPoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => {
            return <li key={user.id}>{user.username}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
