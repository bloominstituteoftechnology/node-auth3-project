import React from "react";

const User = props => {
  console.log("hiiii");
  return (
    <div>
      <p>{props.user.id}</p>
      <p>{props.user.username}</p>
      <p>{props.user.password}</p>
    </div>
  );
};

export default User;
