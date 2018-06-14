import React from "react";
import axios from "axios";

class Users extends React.Component {
  state = {
    users: []
  };
  render() {
    return (
      <ul>
        {this.state.users.map(user => (
          <li>{"Username: " + user.username + " Race: " + user.race}</li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:5500/api/users", requestOptions)
      .then(response => {
        console.log("response", response.data);
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }
}

export default Users;
