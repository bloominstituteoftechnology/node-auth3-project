import React, { Fragment } from 'react'

const Users = ({ users = [] }) => (
  <Fragment>
    <h2>Users</h2>
    <ol>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ol>
  </Fragment>
)

export default Users
