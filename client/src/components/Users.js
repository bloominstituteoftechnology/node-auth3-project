import React, { Component } from "react";

class Users extends Component {
  render() {
    return (
      <div>
        {this.state.users.map(users => {
          return <div>users</div>;
        })}
      </div>
    );
  }
}

export default Users;