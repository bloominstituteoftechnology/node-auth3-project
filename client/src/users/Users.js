import React from 'react';

class Users extends React.Component {
    state = {
        users: [],
    };

  render() {
    return (
      <>
        <h2>Users List</h2>
        <ul>
            {this.state.users.map(user => {
                <li key={user.id}>{user.username}</li>
            })}
        </ul>
      </>
    )
  }
}

export default Users;