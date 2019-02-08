import React from 'react'
import axios from 'axios'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  render() { 
    return (
      <div>
        <h2>
          <ul>
            {this.state.users.map(user => {
              <li key={user.id}>{user.username} - {user.department}</li>
            })}
          </ul>
        </h2>
      </div>
    );
  }
}

export default Users;