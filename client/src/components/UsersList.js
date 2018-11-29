import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [data, setData] = useState({ users: [], access:true, error:'' });

  const fetch = async () => {
    const users = await axios("http://localhost:3334/api/users");
    if (users.data !== data.users) {
      setData({ users: users.data });
    }
  };
  useEffect(() => {
    fetch();
    }
  );
  if (data.error){
      return <h1>{data.error} </h1>
  }
  return (
      <div> 
          {data.users.map(user =>(
              <h5 key={user.id}>{user.username}</h5>
          ))}
      </div>
  )
};

export default UsersList;
