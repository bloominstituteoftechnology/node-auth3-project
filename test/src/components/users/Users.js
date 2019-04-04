import React, { Component } from 'react';

export class Users extends Component {
  render() {
    return (
      <div>
          <>
            <h1> User Lists : </h1>
            {this.props.users.map(user=> 
                <li key={user.id}>  {user.username} : {user.department} </li>     
            )}
            </>
        
      </div>
    )
  }
}

export default Users
