import React from 'react';

const Users = (props) => {
  if (!localStorage.getItem('token')) props.history.push('/signin');
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
