import React from "react";
import axios from "axios";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get("http://localhost:8000/api/users", reqOptions)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Users List</h1>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.id}>
                ID {user.id} {user.username}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
