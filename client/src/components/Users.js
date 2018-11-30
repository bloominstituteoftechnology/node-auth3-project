import React, { Component } from 'react';

const Users = (props) => {

  console.log('PROPS', props.users)
  return (
    <div className='users'>
      <i className='fas fa-users'></i>
      <i className='fas fa-users'></i>
      <i className='fas fa-users'></i>
        <ol>
          {props.users.map(user => <li key={user.id}>{user.username}</li>)}
        </ol>

    </div>
  )
}

export default Users;