import React, { Component } from 'react'

class Users extends Component {
  state = []

  render() {
    return <p>users here</p>
  }
}

export default Users

// <React.Fragment>
//                     <h2>Users</h2>
//                     <ol>
//                       {this.state.users.map(user => (
//                         <li key={user.id}>{user.username}</li>
//                       ))}
//                     </ol>
//                   </React.Fragment>
