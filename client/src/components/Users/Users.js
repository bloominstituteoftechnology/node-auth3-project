import React from "react";

import User from "./User";

import { Container } from "./Users.css";

const Users = ({ users }) => (
  <Container>
    {users.map(user => (
      <User user={user} />
    ))}
  </Container>
);

export default Users;
