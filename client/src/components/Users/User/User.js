import React from "react";
import { Container } from "./User.css";

const User = ({ user }) => (
  <Container>
    <p>{user.username}</p>
    <p>{user.department}</p>
  </Container>
);

export default User;
