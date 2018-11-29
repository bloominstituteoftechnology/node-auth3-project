import React, { useState, useEffect } from "react";
import axios from "axios";

import User from "./User";

import { Container } from "./Users.css";

import { URL } from "../../constants";

const Users = ({ history, setLogin }) => {
  const [users, setUsers] = useState([]);

  const authenticate = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        authorization: token
      }
    };
    if (token) {
      axios
        .get(`${URL}users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            setLogin(true);
            setUsers(res.data);
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          console.error(err);
          history.push("/login");
        });
    } else {
      history.push("/login");
      alert("You must log in to view this content.");
    }
  };

  useEffect(() => authenticate(), []);

  return (
    <Container>
      {users.map(user => (
        <User user={user} />
      ))}
    </Container>
  );
};

export default Users;
