import React from 'react';

const User = props => {
  console.log(props)


  return  (
  <div className='user-container'>
    <h3>{props.user.username}</h3>
    <p>{props.user.password}</p>
  </div>
);
  }

export default User; 