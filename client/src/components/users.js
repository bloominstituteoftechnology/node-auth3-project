import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:8000/api/users", requestOptions)

      .then(res => {
        this.setState({ users: res.data });
        console.log("state", this.state);
      })
      .catch(error => {
        console.error("Axios Failed");
      });
  }
  logoutHandler = e => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };

  render() {
    return (
      <div>
        <div>
          {localStorage.getItem("jwt") && (
            <button onClick={this.logoutHandler}>logout</button>
          )}
        </div>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>
              username: {user.username} department: {user.departments}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;

// const Users = () => {
//   return (
//     <div>
//       <h1>users</h1>
//     </div>
//   );
// };

// export default Users;
