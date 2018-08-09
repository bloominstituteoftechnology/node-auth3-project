import React from 'react';

const User = props => {
  return (
    <div>
      username: {props.user.username}
      <br />
      password: {props.user.password}
      <br />
      department:
      {props.user.department}
      <br />
    </div>
  );
};

export default User;
