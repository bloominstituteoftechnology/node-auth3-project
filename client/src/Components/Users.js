import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }
  render() {
    console.log(this.state.users);
    return (
      <div>
        {!this.state.users ? (
          <div>please login to view content</div>
        ) : (
          this.state.users.map(user => (
            <div key={user.username}>{user.username}</div>
          ))
        )}
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    //console.log("token: ", token);
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
