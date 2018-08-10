import React from "react";
import axios from "axios";
import User from "./User";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwt");
    const authHeader = {
      headers: {
        Authorization: token
      }
    };
    if (token) {
      axios
        .get("http://localhost:8000/api/users", authHeader)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      setTimeout(() => this.props.history.push("/"), 2000);
    }
  }

  Logout = event => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };
  render() {
    console.log("this.state.users is: ", this.state.users);
    return (
      <div>
        <button onClick={this.Logout}>Log Out</button>
        {localStorage.getItem("jwt") ? (
          <div>
            {this.state.users.map(user => {
              return <User key={Math.random()} user={user} />;
            })}
          </div>
        ) : (
          <p>You're not logged in, redirecting...</p>
        )}
      </div>
    );
  }
}

export default Users;
