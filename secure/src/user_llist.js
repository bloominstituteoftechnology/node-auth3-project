import React, { Component } from "react";
import axios from "axios";
import Auth from "../Auth";
import styled from "styled-components";

const List = styled.div`
  color: red;
  font-weight: bold;
`;

class Users extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <List>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </List>
    );
  }
  componentDidMount() {
    axios.get("/api/users").then(res => {
      this.setState({ users: res.data });
    });
  }
}

export default Auth(Users);
