import React, { Component } from "react";
import axios from "axios";
import "./Users.css";

class Users extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div className="userlist">
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>
              <h3>{user.username}</h3>
              <img src={user.avatar} alt="" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");

    const endpoint = "http://localhost:9001/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }
}

export default Users;
