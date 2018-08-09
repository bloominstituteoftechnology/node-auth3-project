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
    axios
      .get("http://localhost:8000/api/users", authHeader)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err.response.data);
      });
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
        {this.state.users.map(user => {
          return <User key={Math.random()} user={user} />;
        })}
      </div>
    );
  }
}

export default Users;
