import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
    componentDidMount() {
      const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:4000/users", reqOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.error("Server Error", error);
      });
    }

  logout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <div>
        <div>
          {this.state.users.map(user => (
            <div>{user.username}</div>
          ))}
        </div>
        {this.state.users.length === 0 ? (
          <div><h1>Please log in to view the users</h1>
          <Link to="/login">
            <button>log in</button>
          </Link></div>
        ) : (
          <Link to="/login">
            <button onClick={this.logout}>log out</button>
          </Link>
        )}
      </div>
    );
  }
}

export default Login;
