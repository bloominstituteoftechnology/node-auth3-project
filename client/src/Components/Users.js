import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  render() {
    return (
      <div>{this.state.users.map(user => <div>{user.username}</div>)}</div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:5500/api/users", requestOptions)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }
}

export default Users;
