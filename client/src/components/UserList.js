import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utilities/axiosWithAuth';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const baseUrl = 'http://localhost:5000/api';

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseUrl}/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log('Error fetching users');
      })
  }, [])

  return (
    <div>
      {users.map(item => <User key={item.id} user={item} />)}
    </div>
  )
}

export default UserList;