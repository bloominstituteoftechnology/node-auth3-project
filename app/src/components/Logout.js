import React from "react";

const Logout = props => {
  const logout = () => {
    localStorage.removeItem("jwtToken");
    props.history.push("/");
  };
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
