import React from 'react';

const User = (props) => {
  return (
    <div>
      <div>{props.user.username}</div>
      <div>{props.user.department}</div>
    </div>
  )
}

export default User;