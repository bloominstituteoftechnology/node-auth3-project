import React, { useState, useEffect } from "react";
import axios from "axios";
const url = 'http://localhost:3334'


const UsersList = () => {
  const [data, setData] = useState({ users: [], access:true, error:'' });

  const fetch = async () => {
    const users = await axios(`${url}/api/users`);
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
              <div key={user.id}><h2>{user.username}</h2><p>{user.department}</p></div>
          ))}
      </div>
  )
};

export default UsersList;
