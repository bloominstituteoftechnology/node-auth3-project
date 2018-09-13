import React from 'react';

const Users = (props) => {
  return (
    <div>
      {props.users.map(user => {
        const { name, id } = user;
        return <p key={id}>{name}</p>
      })}
    </div>
  );
};

export default Users;
