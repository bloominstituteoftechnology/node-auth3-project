import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import "../App.css";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  }

  render() {
    return <div> 
      <h2>List of Users
        <ul> {this.state.users.map(user =>
          (<li key={user.id}>{user.username} - {user.department} </li>))
        }
          </ul>
          </h2>
          </div>;
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')
    const endpoint = "http://localhost:8000/api/users/";
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log("data from /api/users", res.data);
        this.setState({users: res.data });
      })
      .catch(err => {
        console.log("error from /api/users", err);
      });
  }
}

export default Users;
