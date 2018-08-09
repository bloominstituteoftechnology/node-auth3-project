import React from "react";
import axios from "axios";
import "../App.css"

class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get("http://localhost:3300/api/users", requestOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error("Axios failed");
      });
  }

  logoutHandler = e => {
    localStorage.removeItem("jwt");

    this.props.history.push('/signin')
  };


  render() {
    return (
      <div className="users">
        <h1 className="header-title"> Users</h1>
        <ul>
          {this.state.users.map(user => (
            <div className="user-card" key={user.id}>
              <p>User: {user.username}</p>
              <p>Department: {user.department}</p>
            </div>
          ))}
        </ul>
        <div>
          {localStorage.getItem("jwt") && (
            <button onClick={this.logoutHandler}>Logout</button>
          )}
        </div>
      </div>
    );
  }
}

export default Users;
