import React from "react";
import axios from "axios";

class Users extends React.Component {
  state = {
    users: []
  };
  render() {
    if (this.state.users.length > 0)
      return (
        <ul>
          {this.state.users.map((user, index) => (
            <li key={index}>
              {"Username: " + user.username + " Race: " + user.race}
            </li>
          ))}
        </ul>
      );
    else return "Forbidden!";
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
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }
}

export default Users;
