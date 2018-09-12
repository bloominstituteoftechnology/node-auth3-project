import React, { Component } from 'react';

class Users extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchUsers(token);
  }

  render() {
    return (
      <div>
        {this.props.users.map(user => {
          return (
            <div className='user' key={user.id}>
              {user.username}
              {user.department}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Users;
