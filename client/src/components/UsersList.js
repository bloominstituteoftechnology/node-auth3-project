import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "http://localhost:3334";

const UsersList = () => {
  const [data, setData] = useState({ users: [], access: true, error: "" });

  const fetch = async () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const options = {
        headers: {
          authorization: token
        }
      };
      try {
        const users = await axios(`${url}/api/users`, options);
        if (users.data !== data.users) {
          setData({ users: users.data });
        }
      } catch (err) {
        setData({ error: "broken", users: [] });
      }
    }else{
        setData({error:'please log in'})
    }
  };
  useEffect(() => {
    fetch();
  });
  if (data.error) {
    return <h1>{data.error} </h1>;
  }
  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.department}</p>
        </div>
      ))}
      <button onClick={()=>localStorage.removeItem('token')}>Log out</button>
    </div>
  );
};

export default UsersList;
