import React from 'react';
import User from "./User";


const UserList = props => (
  <div className='the-user-list'>
    {props.users
    .map(user => {
      console.log(user)
      return (
        <User 
          key={user.id} 
          {...user}
          user={user}
        />
      );
    })}
  </div>
);

export default UserList;