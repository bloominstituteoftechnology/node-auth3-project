import React, { Component } from 'react'

import User from './User';

class UsersList extends Component {
  componentWillMount(){
    this.props.fetchUsers();
  }
  render(){
    return (
      <div>
        <h2>Users</h2>
        <h3>{this.props.message}</h3>
        {this.props.users.map(user => 
          <User key={user.id} user={user} />
        )}
        <button onClick={this.props.logout} >Log Out</button>
      </div>
    )
  }
}
UsersList.propTypes = {

}

export default UsersList
