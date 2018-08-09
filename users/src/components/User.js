import React from "react";

const User = props => {
  console.log("hiiii");
  return (
    <div>
      <p>Staff ID: {props.user.id}</p>
      <p>Staff Name: {props.user.username}</p>
      <p>Staff Department: {props.user.department}</p>
    </div>
  );
};

export default User;
