import React, { Component } from "react";
import axios from "axios";

function IfSignedIn(props) {
  if (props.users.length > 0) {
    return props.users.map(user => {
      return <li key={user.id}>{user.username}</li>;
    });
  }
  return <li>You shall not see the current users!</li>;
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:4200/users", options)
      .then(res => {
        console.log("data from /users", res.users.data);
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Current users</h1>
        <ul>
          <IfSignedIn users={this.state.users} />
        </ul>
      </div>
    );
  }
}

export default Users;
