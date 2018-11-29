import React, { Component } from 'react';

class Users extends Component {
  state = {};
  render() {
    const { users } = this.props;
    return (
      <div>
        {!users ? (
          <div>Loading users...</div>
        ) : (
          users.map(user => <div key={user.id}>{user.username}</div>)
        )}
      </div>
    );
  }
}

export default Users;
