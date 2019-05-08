import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Logout = props => {
  const handleClick = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.history.push("/login");
  };

  return (
    <React.Fragment>
      <NavLink to="/login" onClick={handleClick}>
        Log Out
      </NavLink>
    </React.Fragment>
  );
};

export default withRouter(Logout);
