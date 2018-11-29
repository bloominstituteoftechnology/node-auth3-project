import React from "react";

const UserListPage = props => {
  return (
    <div>
      {props.loggedIn === true ? <h1>Please see your User List Below</h1> : <h1>Please log in to see your User List</h1>}

      <div className="userListContainer">
        <div className="dataColumn">
          <h2 className="columnHeader">ID</h2>
          {props.users.map(user => {
            return <p className="columnCell" key={user.id}>{user.id}</p>;
          })}
        </div>

        <div className="dataColumn">
          <h2 className="columnHeader">Name</h2>
          {props.users.map(user => {
            return <p className="columnCell" key={user.id}>{user.username}</p>;
          })}
        </div>

        <div className="dataColumn">
          <h2 className="columnHeader">Department</h2>
          {props.users.map(user => {
            return <p className="columnCell" key={user.id}>{user.department}</p>;
          })}
        </div>

      </div>
    </div>
  );
};

export default UserListPage;
