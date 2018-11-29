import React, { Component } from "react";

export default class Users extends Component {
  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <React.Fragment>
            <h1>{user.username}</h1>
            {user.department != null ? (
              <p> Department: {user.department}</p>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    );
  }
}
