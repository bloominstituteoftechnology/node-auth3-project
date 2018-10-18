import React, { Component } from "react";
import axios from "axios";
import "./Users.css";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    // pull the jwt token from local storage
    const token = localStorage.getItem("jwt");

    // set the endpoint constant
    const endpoint = "http://localhost:9001/api/users";

    // set up the headers options and authorization token
    const options = {
      headers: {
        Authorization: token
      }
    };

    // get the options on the endpoint
    axios
      .get(endpoint, options)
      .then(res => {
        // set the state with the res.data
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

  render() {
    return (
      <div className="userlist">
        <h2>List of Users</h2>
        <ul>
          {/* map over the users and pull out data to render */}
          {this.state.users.map(user => (
            <li key={user.id}>
              <h3>{user.username}</h3>
              <p>({user.department})</p>
              <img src={user.avatar} alt="" />
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
